---
title: Внедрение онлайн-редактора
description: Внедрение редактора во внешний интернет-магазин с собственной корзиной, оплатой и доставкой
sidebar_position: 5
---

# Внедрение онлайн-редактора
* Редактор дизайнов можно использовать на внешнем (относительно сайта на платформе Pixlpark) сайте. Например, на сайтах использующих такие CMS как WordPress, 1С-Битрикс, Joomla и прочие.
* Редактор встраивается в несколько этапов:
    1. [Настройка платформы Pixlpark](/dev/editor#настройка-платформы-pixlpark).
    2. [Создание дизайна](/dev/editor#создание-дизайна)
        + [На анонимного пользователя](/dev/editor#на-анонимного-пользователя-без-регистрации) (упрощённый сценарий без регистрации).
        + [На зарегистрированного пользователя](/dev/editor#на-зарегистрированного-пользователя-реализация-аутентификации) (сценарий реализации аутентификации).
    3. [Встраивание редактора на страницу сайта](/dev/editor#встраивание-редактора-на-страницу-сайта).
    4. [Получение файлов к печати](/dev/editor#получение-файлов-к-печати).

## Настройка платформы Pixlpark
* Для того, чтобы встроить редактор дизайнов в сторонний сайт, вам необходимо следующим образом подготовить сайт на платформе Pixlpark (откуда подтягиваются все настройки для редактора):
    + Содержит доступную и настроенную категорию продукта и продукт с уникальной ссылкой в редактор, который необходимо интегрировать.
    + В подразделе "__Основные настройки__" раздела "__Настройки / Доступ__" включить опцию "__Разрешить встраивать сайт на внешние ресурсы (сайт должен работать с защищенным протоколом HTTPS и на поддомене ресурса)__" и указать внешний домен с протоколом.
    + В подразделе "__Доступность API__" раздела "__Настройки / Доступ__" включена опция "__Разрешить доступ к данным через API__".
    + Находится на поддомене внешнего сайта, куда необходимо интегрировать редактор. Подробнее о настройках доменного имени можно узнать на [странице](https://docs.pixlpark.ru/site/domains).
* Внешний сайт должен работать на протоколе HTTPS.
* Интеграция необходимого редактора с внешним сайтом осуществляется при помощи идентификатора продукта, который может быть двух видов:
    + "__ID__" - уникальный идентификатор продукта. При удалении с сайта на платформе Pixlpark продукта с указанным во встраиваемом редакторе ID, на внешнем сайте редактор работать не будет.
    + "__categoryUrlName__" и "__productUrlName__" - идентификатор категории продукта и идентификатор продукта в URL. При отсутствии указания "__productUrlName__" редактор будет инициализирован первым доступным продуктом категории продукта.

## Создание дизайна
* Можно реализовать 2 варианта создания дизайна в редакторе:
    1. Дизайн создается на анонимного пользователя. В этом случае, если не создать заказ, то дизайн хранится в системе всего 14 дней.
    2. Дизайн создается на зарегистрированного пользователя и будет хранится согласно настройкам аккаунта. В этом случае процесс аутентификации необходимо пройти перед загрузкой редактора.
* Рассмотрим их подробнее.

### На анонимного пользователя (без регистрации)
* Если необходимо создать дизайн пользователя, который не зарегистрирован (или не авторизован) на сайте, то применяется сценарий создания дизайна без аутентификации пользователя. Он приведен далее.
* Обратите внимание, что в данном случае кнопка "__Заказать__" в редакторе работать не будет. Поэтому вам необходимо создать свою аналогичную кнопку и разместить её вне блока редактора.
1. Клиент нажимает на вашу кнопку "__Заказать__" — вызывается функция:
   ```js
   saveProjectCustomProductFile({ ignoreErrors?: boolean }) : Promise<ISaveDesignResult>
   ```
   Параметр `ignoreErrors` по умолчанию имеет значение `true`. Возвращаемый результат:
   ```js
   interface ISaveDesignResult {
       designId: number;
       userId: number;
       previews: [
           { surfaceIndex: 0; previewUrl: "https://.../0.jpg" },
           { surfaceIndex: 1; previewUrl: "https://.../1.jpg" },
           ...
       ];
   }
   ```
2. Показываем модальное окно с предупреждениями, если это нужно (не обязательно).
3. Сохраняете `designId` и используете его по своему сценарию. Если в течении 14 дней из этого дизайна не будет создан заказ, мы автоматически его удаляем.
4. На сервере вызываете запрос:
   ```
   POST api.pixlpark.com/orders/createByDesign?designIds=123,321,435
   ```
   В ответ получите `orderId`.
5. После создания заказа Pixlpark автоматически запускает рендеринг (в среднем процесс формирования файлов печати занимает от 5 до 20 минут).
6. По завершении рендеринга вы получите уведомление через вебхук, адрес которого можно настроить в панели управления в разделе "__Маркетинг / Уведомления / Настройка вебхуков__".
7. Получив уведомление, вы можете запросить информацию о заказе через __API api.pixlpark.com__ — в ответе получите ссылку на архив с готовыми файлами.

### На зарегистрированного пользователя (реализация аутентификации)
* Внешний редактор запускается в двух режимах: __Гость__ и __Пользователь__.
    + __Гость__ <br/> В данном режиме доступны все функции редактора, за исключением сохранения дизайнов. Перед сохранением дизайна редактор запрашивает токен пользователя при помощи вызова метода `config.auth.getToken` (должен возвращать `Promise <string>`). Режим запускается при условии установления параметра `config.auth.userToken = null` в конфигурации редактора. Также, для данного режима необходимо реализовать метод `config.auth.getToken()` перед сохранением дизайна для получения токена пользователя.
    + __Пользователь__ <br/> В данном режиме доступны все функции редактора. Режим запускается при условии установления параметра `config.auth.userToken` отличного от пустой строки или от `null` в конфигурации редактора. Далее, указанный токен будет проверен на сервере. В случае, если валидация токена не осуществится, редактор прекратит свою работу.
* Для получения токена пользователя необходимо реализовать взаимодействие с API Pixlpark.
* В случае, если пользователь аутентифицирован на внешнем сайте, необходимо получить или создать (при отсутствии данного пользователя на сайте в сервисе Pixlpark) через API Pixlpark и получить внешний токен:
    + `GET api.pixlpark.com/users/byEmail` и/или `POST api.pixlpark.com/users/create`.
    + `GET /users/{id}/frontendToken`.
* В случае, если пользователь не аутентифицирован на внешнем сайте, необходимо его зарегистрировать и создать его копию на сайте в сервисе Pixlpark.
    + `GET api.pixlpark.com/users/byEmail` и/или `POST api.pixlpark.com/users/create`.
    + `GET /users/{id}/frontendToken`.

## Встраивание редактора на страницу сайта
* Редактор встраивается в три этапа:
    1. [Подготовка страницы внешнего сайта](/dev/editor#подготовка-страницы-внешнего-сайта).
    2. [Определение конфигурации редактора](/dev/editor#определение-конфигурации-редактора).
    3. [Описание конфигурационного файла](/dev/editor#получение-файлов-к-печати).

### Подготовка страницы внешнего сайта

#### Для одного продукта
* Для встраивания редактора на страницу внешнего сайта необходимо создать контейнер согласно коду
```html
    <div id="editorContainer" class="editor-container loading-wheel"></div>
```
* и добавить его в разметку страницы внешнего сайта. Редактор заполнит весь размер контейнера.
* Далее, добавить на страницу стилевые правила: 
```css
 .btn {background: #fff;border: solid 1px #ccc !important;box-shadow: #ddd 0 0 3px;color: #000 !important;}

 body {font-family: sans-serif;padding: 10px 40px}
 @keyframes cssload-spin {100% {transform: rotate(360deg);transform: rotate(360deg)}}

 .editor-container.error {border: solid 1px #983a3a;box-shadow: #e15959 0 0 3px;}
 .editor-container .error-message {position: relative;margin: 20px;text-align: left;color: #000000;font-family: monospace;
            z-index: 1000000000;background: #ffcece;padding: 10px 20px;border: solid 1px #a52020;}

 .editor-container {width: 65%; height: 600px; position: relative; border: solid 1px #ccc; box-shadow: #efefef 0 0 14px;}
 .loading-wheel:before {
        position:absolute;top:50%;left:50%;content:'';z-index:1112;display:block;width:32px;height:32px;margin:-16px 0 0 -16px;
        border: 2px solid rgb(117,117,117);border-radius: 50%;border-left-color: transparent;border-right-color: transparent;
        animation: cssload-spin 500ms infinite linear;
  }
 .loading-wheel:after{position:absolute;top:0;left:0;bottom:0;right:0;content:'';background:#fff;z-index:1111;opacity:.9;display:block}
```
* Затем, добавить скрипт для загрузки редактора на страницу внешнего сайта.
```js
    <script src="https://ваш-сайт-в-Pixlpark/api/externalEditor/js" onerror="onPxpError('Error while loading init script')" onload="onPxpLoaded()"></script>
```
> Скрипт необходимо расположить ближе к подвалу в разметке страницы.

#### Для нескольких продуктов
* Для встраивания редактора с несколькими продуктами на страницу внешнего сайта необходимо создать разметку согласно коду
```html
    <fieldset id="materialSelector" class="editor-products">
        <label class="editor-products__label">
            <input type="radio" name="editor" value="ID" checked> <!-- ID - id продукта 1-->
            Продукт 1
        </label>

        <label class="editor-products__label">
            <input type="radio" name="editor" value="ID"> <!-- ID - id продукта 2-->
            Продукт 2
        </label>
    </fieldset>
    <div id="editorContainer" class="editor-container loading-wheel"></div>
```
* и добавить еe в разметку страницы внешнего сайта. Редактор заполнит весь размер контейнера.
* Далее, добавить на страницу стилевые правила: 
```css
 .btn {background: #fff;border: solid 1px #ccc !important;box-shadow: #ddd 0 0 3px;color: #000 !important;}

 body {font-family: sans-serif;padding: 10px 40px}
 @keyframes cssload-spin {100% {transform: rotate(360deg);transform: rotate(360deg)}}

 .editor-products {box-sizing:border-box;display:flex;flex-wrap:wrap;align-items:baseline;padding:10px}
 .editor-products__label {margin: 0 15px}

 .editor-container.error {border: solid 1px #983a3a;box-shadow: #e15959 0 0 3px;}
 .editor-container .error-message {position: relative;margin: 20px;text-align: left;color: #000000;font-family: monospace;
            z-index: 1000000000;background: #ffcece;padding: 10px 20px;border: solid 1px #a52020;}
 .editor-container {width: 65%; height: 600px; position: relative; border: solid 1px #ccc; box-shadow: #efefef 0 0 14px;}
 .loading-wheel:before {
        position:absolute;top:50%;left:50%;content:'';z-index:1112;display:block;width:32px;height:32px;margin:-16px 0 0 -16px;
        border: 2px solid rgb(117,117,117);border-radius: 50%;border-left-color: transparent;border-right-color: transparent;
        animation: cssload-spin 500ms infinite linear;
  }
 .loading-wheel:after{position:absolute;top:0;left:0;bottom:0;right:0;content:'';background:#fff;z-index:1111;opacity:.9;display:block}
```
* Затем, добавить скрипт для загрузки редактора на страницу внешнего сайта.
```js
    <script src="https://ваш-сайт-в-Pixlpark/api/externalEditor/js" onerror="onPxpError('Error while loading init script')"></script>
```
> Скрипт необходимо расположить ближе к подвалу в разметке страницы.

## Редактор дизайнов

### Определение конфигурации редактора
* Для получения токена пользователя необходимо реализовать взаимодействие с API Pixlpark.
* В случае, если пользователь аутентифицирован на внешнем сайте, необходимо получить или создать (при отсутствии данного пользователя на сайте в сервисе Pixlpark) через API Pixlpark и получить внешний токен:
    + `GET api.pixlpark.com/users/byEmail` и/или `POST api.pixlpark.com/users/create`.
    + `GET /users/{id}/frontendToken`.
* В случае, если пользователь не аутентифицирован на внешнем сайте, необходимо его зарегистрировать и создать его копию на сайте в сервисе Pixlpark.
    + `GET api.pixlpark.com/users/byEmail` и/или `POST api.pixlpark.com/users/create`.
    + `GET /users/{id}/frontendToken`.
#### Для одного продукта
* Определить конфигурацию редактора на странице внешнего сайта необходимо при помощи кода:
```js
const container = document.getElementById('editorContainer');
const designEditorConfig = {
    product: {
        productUrlName: "идентификатор_продукта", //например, "50x90-one-sided"
        categoryUrlName: "идентификатор_категории_продукта", //например, "businesscards-template"
        //либо id: <ID товара>
    },
    auth: {
        // В этом методе необходимо найти или создать пользователя на стороне Pixlpark,
        // связать его с авторизованным пользователем вашей платформы
        //  и вернуть его token на платформе Pixlpark
        getToken: () => {
            return new Promise((resolve, reject) => {
                var token = prompt('Enter user auth token:');
                if (token.length > 0)
                    resolve(token);
                else
                    reject();
            })
        }
    },
    ui: {
        layoutMode: "auto",
    },
    events: {
        onError: (error) => { onPxpError(error); },
        onReady: () => {
            console.log("Editor ready");
            container.classList.remove("loading-wheel")
            console.log("Current user", window.editor.userInfo);
        },
        onCartItemCreated: (response) => {
            var confirm = window.confirm(`Положили товар: ${response.shoppingCartItemId}. Перейти в корзину?`);
            if (confirm) {
                window.location.href = originUrl + response.redirectUrl;
            }
        },
        onPriceChanged: (newPrice) => {
            console.log("New price recieved", newPrice);
            document.getElementById("externalPrice").innerHTML = newPrice.totalPriceString
        }
    },
}
// Обработчик ошибок
function onPxpError(error) {
    container.classList.remove("loading-wheel")
    container.classList.add("error")
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message"
    errorDiv.innerText = error;
    container.appendChild(errorDiv)
}
// Этот код вызывается после загрузки скрипта редактора
function onPxpLoaded() {
    var editor = pxp.external.createDesignEditor(container, designEditorConfig);
    editor.render();
    window.editor = editor;
}
```
> Скрипт необходимо расположить после скрипта загрузки редактора.
#### Для нескольких продуктов
* Определить конфигурацию редактора на странице внешнего сайта необходимо при помощи кода:
```js
    function initEditor(materialId) {
        const container = document.getElementById('editorContainer');
        const designEditorConfig = {
        product: {
            id: materialId,
        },
        auth: {
             // В этом методе необходимо найти или создать пользователя на стороне Pixlpark,
            // связать его с авторизованным пользователем вашей платформы
            //  и вернуть его token на платформе Pixlpark
            getToken: () => {
                return new Promise((resolve, reject) => {
                    var token = prompt('Enter user auth token:');
                    if (token.length > 0)
                        resolve(token);
                    else
                        reject();
                })
            }
        },
        ui: {
            layoutMode: "auto",
        },
        events: {
            onError: (error) => { onPxpError(error); },
            onReady: () => {
                console.log("Editor ready");
                container.classList.remove("loading-wheel")
                console.log("Current user", window.editor.userInfo);
            },
            onCartItemCreated: (response) => {
                var confirm = window.confirm(`Положили товар: ${response.shoppingCartItemId}. Перейти в корзину?`);
                if (confirm) {
                    window.location.href = originUrl + response.redirectUrl;
                }
            },
            onPriceChanged: (newPrice) => {
                console.log("New price recieved", newPrice);
                document.getElementById("externalPrice").innerHTML = newPrice.totalPriceString
            }
        },
        };       
        var editor = pxp.external.createDesignEditor(container, designEditorConfig);
        editor.render();
        window.editor = editor;
    }
// Обработчик ошибок
function onPxpError(error) {
    container.classList.remove("loading-wheel")
    container.classList.add("error")
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message"
    errorDiv.innerText = error;
    container.appendChild(errorDiv)
}
// Изменение продукта в редакторе
function updateMaterial(){
    var fieldset = document.getElementById("materialSelector");
    var materialId = Array.from(fieldset.querySelectorAll("input")).find((input)=> input.checked).value;
    if (materialId != null){
	    if (window.editor != null && window.editor.editor != null){
            window.editor.editor.destroy();
        }
		initEditor(parseInt(materialId));		
    }
}
document.getElementById("materialSelector").addEventListener("change", updateMaterial);
updateMaterial();
```
> Скрипт необходимо расположить после скрипта загрузки редактора.

### Описание конфигурационного файла

```js
interface IDesignEditorConfig {
    // Настройка товара
    product: {
        // ID продукта. Можно указать ID либо categoryUrlName и productUrlName
        id?: number,
        // Количество разворотов у продукта
        pages?: number | null,

        // Часть URL категории товара
        categoryUrlName?: string,

        // Часть URL товара
        productUrlName?: string,

        // Кол-во товара. При отсутствии значения редактор устанавливает кол-во по умолчанию
        quantity?: number,

        // Внешняя калькуляция цены. При самостоятельном расчете цены необходимо реализовать этот метод
        // Метод необходимо вызвать, когда нужно отобразить цену
        calculatePrice?: (state: IVectorEditorPriceCalculatorInfo) => Promise<{ totalPrice: number; totalPriceString: string; quantity: number; }>,

        // Загрузка дизайна
        design: {
            // ID шаблона для загрузки при инициализации
            templateId?: number;

            // Состояние которое необходимо загрузить. Например, элемент корзины или сохраненный дизайн
            state?: IDesignEditorState | null,
            
            // Клипарты
            clipart?: {
                // Идентификатор клипарта 
                clipartSetId: number,

                // Идентификатор файла клипарта 
                clipartFileId: number
            }
        }
    }

    // Аутентификация, если на момент открытия редактора известен пользователь,
    //  то используйте userToken, иначе getToken
    auth: {
        // Этот метод будет вызван если не задан userToken и необходим зарегистрированный пользователь
        // В этом методе необходимо найти или создать пользователя на стороне Pixlpark,
        // связать его с авторизованным пользователем вашей платформы
        //  и вернуть его token на платформе Pixlpark
        getToken: (currentUserId?: number | null) => Promise<string>,

        // Токен зарегистрированного пользователя
        // При его указании редактор попробует войти под этим токеном
        // Если не получится, редактор завершит работу с ошибкой
        userToken?: string,
    }
    
    // События редактора
    events?: {
        // Вызывается после того, как товар был добавлен в корзину.
        onCartItemCreated?: (state: { redirectUrl: string; shoppingCartItemId: number; userId: number;}) => void

        // Вызывается после того, как был создан заказ.
        onOrderCreated?: (state: { redirectUrl: string; orderId: number; userId: number;}) => void

        // Вызывается при изменениях в редакторе
        onStateChanged?: (event: HistoryEvent) => void

        // Вызывается после того как редактор загружен и готов к работе
        onReady?: () => void

        // Вызывается при изменении цены
        onPriceChanged?: (newPrice: { totalPrice: number; totalPriceString: string; quantity: number; }) => void

        // Вызывается при возникновении непредвиденной ошибки
        onError?: (error: string) => void

        // Вызывается при смене продукта
        onMaterialChange?: (currentMaterialId: number) => void

        // Вызывается при возникновении непредвиденной ошибки в момент получения дизайна
        onLoadStateFailed?: (designId: number) => void

        // Вызывается при сохранении дизайна
        onProjectSave?: (designId: number) => void
    },
    // Конфигуратор интерфейса редактора 
    ui?: {
        // Задает тип интерфейса: обычный или мобильный
        // Возможные значения: "auto", "desktop", "mobile"
        // Значение по умолчанию: "auto"
        layoutMode: "auto" | "desktop" | "mobile" | null;

        //Действие кнопки "Заказать". Если выбрано 'createOrder' - будет создан заказ,
        //  'addToCart' - товар будет добавлен в корзину. По умолчанию 'addToCart'.
        nextStepButtonAction?: 'addToCart' | 'createOrder';

        // Выводит предупреждение при покидании страницы
        // Значение по умолчанию: true
        captureWindowUnload?: boolean;

        // Настройка верхней панели редактора. При значении null панель не выводится.
        header?: {
            // Отображать кнопку домой
            // Значение по умолчанию: true
            homeButton?: boolean;

            // Изображение для кнопки домой. Если значение не указано или равно null будет установлен логотип из настройки сайта
            // Значение по умолчанию: null
            homeButtonImageUrl?: string | null;

            // Отображение хлебных крошек
            // Значение по умолчанию: true
            breadCrumbs?: boolean;

            // Отображение кнопки "Сохранить"
            // Значение по умолчанию: true
            saveButton?: boolean;

            // Отображение кнопки "Предпросмотр"
            // Значение по умолчанию: true
            previewButton?: boolean;

            // Отображение кнопки "Заказать"
            // Значение по умолчанию: true
            addToCartButton?: boolean;

            // Отображение цены в кнопке "Заказать"
            // Значение по умолчанию: true
            price?: boolean;
        } | null;
    },

}

// Конфигурация для внешней калькуляции стоимости
interface IVectorEditorPriceCalculatorInfo {
    // Конфигурация стоимости зоны печати
    surfaces: IVectorEditorSurfacePriceInfo[];
    // Общее количество зон печати
    totalSurfaceCount: number;
    // Общее количество заполненных зон печати
    totalFilledSurfaceCount: number;
}

// Конфигурация стоимости зоны печати
interface IVectorEditorSurfacePriceInfo {
    // Индекс поверхности
    index: number;
    // Индекс зоны печати
    zoneIndex: number;
    // Название зоны печати
    zoneName: string;
    // Ширина зоны печати
    zoneWidth: number;
    // Высота зоны печати
    zoneHeight: number;
    // Цена зоны печати
    zonePrice: number;
    // Заполненность зоны печати
    isFilled: Boolean;
}

// Конфигурация дизайна
interface IDesignEditorState {
    // Идентификатор дизайна
    id: number | null;
    // Тип дизайна
    type: 'cartItem' | 'design' | 'orderDetail'; // cartItem - позиция в корзине; design - дизайн из личного кабинета; orderDetail - позиция заказа
    // Пароль от дизайна (если дизайн имеет общий доступ)
    designPassphrase?: string;
    // Название дизайна
    title?: string | null;
}

```
## Редактор фотопечати

### Определение конфигурации редактора
* Для получения токена пользователя необходимо реализовать взаимодействие с API Pixlpark.
* В случае, если пользователь аутентифицирован на внешнем сайте, необходимо получить или создать (при отсутствии данного пользователя на сайте в сервисе Pixlpark) через API Pixlpark и получить внешний токен:
    + `GET api.pixlpark.com/users/byEmail` и/или `POST api.pixlpark.com/users/create`.
    + `GET /users/{id}/frontendToken`.
* В случае, если пользователь не аутентифицирован на внешнем сайте, необходимо его зарегистрировать и создать его копию на сайте в сервисе Pixlpark.
    + `GET api.pixlpark.com/users/byEmail` и/или `POST api.pixlpark.com/users/create`.
    + `GET /users/{id}/frontendToken`.
* Определить конфигурацию редактора на странице внешнего сайта необходимо при помощи кода:
```js
const container = document.getElementById('editorContainer');
const designEditorConfig = {
    product: {
        id: 554547 // ID товара
    },
    auth: {
        // В этом методе необходимо найти или создать пользователя на стороне Pixlpark,
        // связать его с авторизованным пользователем вашей платформы
        //  и вернуть его token на платформе Pixlpark
        getToken: () => {
            return new Promise((resolve, reject) => {
                var token = prompt('Enter user auth token:');
                if (token.length > 0)
                    resolve(token);
                else
                    reject();
            })
        }
    },
    ui: {
        layoutMode: "auto",
    },
    events: {
        onError: (error) => { onPxpError(error); },
        onReady: () => {
            console.log("Editor ready");
            container.classList.remove("loading-wheel")
            console.log("Current user", window.editor.userInfo);
        },
        onCartItemCreated: (response) => {
            var confirm = window.confirm(`Положили товар: ${response.shoppingCartItemId}. Перейти в корзину?`);
            if (confirm) {
                window.location.href = originUrl + response.redirectUrl;
            }
        },
        onPriceChanged: (newPrice) => {
            console.log("New price recieved", newPrice);
            document.getElementById("externalPrice").innerHTML = newPrice.totalPriceString
        }
    },
}
// Обработчик ошибок
function onPxpError(error) {
    container.classList.remove("loading-wheel")
    container.classList.add("error")
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message"
    errorDiv.innerText = error;
    container.appendChild(errorDiv)
}
// Этот код вызывается после загрузки скрипта редактора
function onPxpLoaded() {
    var editor = pxp.external.createPhotoEditor(container, designEditorConfig);
    editor.render();
    window.editor = editor;
}
```
> Скрипт необходимо расположить после скрипта загрузки редактора.

### Описание конфигурационного файла

```js
interface IPhotoEditorConfig {
    // Настройка товара
    product: {
        // ID продукта.
        id?: number,

        // Внешняя калькуляция цены. При самостоятельном расчете цены необходимо реализовать этот метод
        // Метод необходимо вызвать, когда нужно отобразить цену
        calculatePrice?: (state: {materialId: number; count: number;}) => Promise<{ totalPrice: number; quantity: number; }>,
    }

    // Аутентификация, если на момент открытия редактора известен пользователь,
    //  то используйте userToken, иначе getToken
    auth: {
        // Этот метод будет вызван если не задан userToken и необходим зарегистрированный пользователь
        // В этом методе необходимо найти или создать пользователя на стороне Pixlpark,
        // связать его с авторизованным пользователем вашей платформы
        //  и вернуть его token на платформе Pixlpark
        getToken: (currentUserId?: number | null) => Promise<string>,

        // Токен зарегистрированного пользователя
        // При его указании редактор попробует войти под этим токеном
        // Если не получится, редактор завершит работу с ошибкой
        userToken?: string,
    }
    
    // События редактора
    events?: {
        // Вызывается после того, как товар был добавлен в корзину.
        onCartItemCreated?: (state: { redirectUrl: string; shoppingCartItemId: number; userId: number;}) => void

        // Вызывается после того, как был создан заказ.
        onOrderCreated?: (state: { redirectUrl: string; orderId: number; userId: number;}) => void

        // Вызывается после того как редактор загружен и готов к работе
        onReady?: () => void

        //Произошла ошибка при добавлении в корзину, или создании заказа
        onCartItemCreateFailed?: (id: number) => void;

        // Вызывается при смене продукта
        onMaterialChange?: (currentMaterialId: number) => void

        // Вызывается при изменении цены
        onPriceChanged?: (newPrice: { totalPrice: number; totalPriceString: string; quantity: number; }) => void

        // Вызывается при возникновении непредвиденной ошибки
        onError?: (error: string) => void

        // Вызывается при изменениях в редакторе
        onPrintsChange?: () => void

        onPriceNeedRecalculate?: (states: {MaterialId: number;EditorStateJson: string;}[]) => void;

        onFileManagerClosed?: () => void;
        onFileManagerOpened?: () => void;
        onFormatModalOpened?: () => void;
        onFormatModalClosed?: () => void;
        onPrintEditorClosed?: () => void;
        onPrintEditorOpened?: () => void;
    },
    // Конфигуратор интерфейса редактора 
    ui?: {
        // Задает тип интерфейса: обычный или мобильный
        // Возможные значения: "auto", "desktop", "mobile"
        // Значение по умолчанию: "auto"
        layoutMode: "auto" | "desktop" | "mobile" | null;

        //Действие кнопки "Заказать". Если выбрано 'createOrder' - будет создан заказ,
        // 'addToCart' - товар будет добавлен в корзину. По умолчанию 'addToCart'.
        nextStepButtonAction?: 'addToCart' | 'createOrder';

        isMobileApp: boolean;
        isMultiformat: boolean;
        hideHeader: boolean;
        hideBreadcrumbs?: boolean;
        hideCalculator: boolean;
        hideHome: boolean;
        hideSidebar: boolean;
    },

}

```
## Получение файлов к печати
### Добавление в корзину и создание заказа

* Редактор поддерживает два сценария оформления:
    + Добавление в корзину (поведение по умолчанию)
    + Автоматическое создание заказа (минуя корзину)

Тип сценария задаётся в конфигурации в секции ui:
```js
ui: {
    nextStepButtonAction?: 'addToCart' | 'createOrder';
}
```
`addToCart` – стандартное поведение, товар добавляется в корзину.
`createOrder` – заказ создаётся сразу, без добавления в корзину.
По умолчанию используется `addToCart`.


### Сценарий 1: Добавление в корзину (addToCart)
* После нажатия кнопки "__Заказать__" в модальном окне утверждения дизайна редактора, заказываемый продукт добавляется в корзину Pixlpark. Затем отображается реализованный на внешнем сайте хэндлер `onCartItemCreated`, в который передается идентификатор пользователя (`userId`) и идентификатор позиции корзины (`shoppingCartItemId`) Pixlpark.
* Далее, в `onCartItemCreated` необходимо:
    + Закрыть редактор (например, если он был в div-элементе).
    + Добавить позицию в корзину внешнего сайта.
    + Инициировать подготовку файлов для печати.
* При желании к позиции корзины внешнего сайта можно прикрепить превью созданного дизайна, которое находится у соответствующего элемента корзины Pixlpark. Для этого нужно с помощью [API-метода](https://docs.pixlpark.ru/dev/api) __Get By UserId__ (`/cart/{userId}`) получить всю корзину, а уже затем найти интересующий элемент по `shoppingCartItemId`.
* Отметим, что корзина Pixlpark хранится ровно 14 дней. После чего ее содержимое удаляется. Поэтому, на внешнем сайте надо либо предусмотреть аналогичную логику с уведомлением клиента об очистке корзины, либо в этот срок инициировать подготовку файлов для печати.
* Для создания заказа необходимо:
    + С помощью [API-метода](https://docs.pixlpark.ru/dev/api) __Create Order__ (/orders/create) необходимо создать заказ, передав в качестве его параметров __userId__, __shoppingCartItemId__ и __shippingId__, где __shippingId__ - это идентификатор любой активной доставки, определенной в панели управления Pixlpark в разделе "__Настройка / Доставка / Способы доставки__".
![](../_media/dev/editor-shipping-id.png ':size=80%')

### Сценарий 2: Автоматическое создание заказа (createOrder)
* При использовании режима `createOrder` товар не добавляется в корзину, а заказ создаётся сразу.
* Как это работает:
    + После нажатия кнопки `Заказать` редактор сразу создаёт заказ в Pixlpark.

После успешного создания вызывается обработчик `onOrderCreated`.
```js
onOrderCreated?: (state: {
    redirectUrl: string;
    orderId: number;
    userId: number;
}) => void
```

* Что нужно сделать в `onOrderCreated`:
    + Закрыть редактор.
    + Зафиксировать заказ на вашем сайте (если требуется).

* При необходимости выполнить редирект по redirectUrl.

### Получение информации о новом заказе
* В панели управления Pixlpark в разделе "__Маркетинг / Уведомления / Настройка вебхуков__" добавить вебхук "__Заказ: статус рендеринга изменен__", указав URL-адрес для отправки информации о появлении нового готового к печати заказа.
![](../_media/dev/editor-webhook.png)
* Реализовать обработчик для вебхука выше, который будет содержать ссылку на архив заказа с файлами для печати (`DownloadLink`). 
* При срабатывании вебхука «Заказ: статус рендеринга изменен» сервер Pixlpark отправляет объект `OrderMessageDTO`.
Этот объект содержит всю основную информацию о заказе, его статусах, пользователе, доставке и ссылку для печати.
```
| Поле            | Тип         | Описание                                                     |
| --------------- | ----------- | -------------------------------------------------------------|
| `Id`            | `number`    | Внутренний идентификатор заказа в Pixlpark                   |
| `DownloadLink   | `string`    | Ссылка на скачивание заказа                                  |
| `PhotolabId`    | `number`    | Идентификатор фотолаба                                       |
| `CustomId`      | `string`    | Пользовательский ID заказа (если задан)                      |
| `SourceOrderId` | `number?`   | ID исходного заказа (например, при копировании)              |
| `Title`         | `string`    | Название заказа                                              |
| `Status`        | `string`    | Текущий статус заказа                                        |
| `PaymentStatus` | `string`    | Статус оплаты                                                |
| `RenderStatus`  | `string`    | Статус рендеринга                                            |
| `StatusDate`    | `DateTime?` | Дата последнего изменения статуса                            |
| `DateCreated`   | `DateTime`  | Дата создания заказа                                         |
| `DateModified`  | `DateTime`  | Дата последнего изменения                                    |
| `DatePaid`      | `DateTime?` | Дата оплаты                                                  |
| `DateReady`     | `DateTime?` | Дата готовности                                              |
| `PreviewImageUrl` | `string` | Ссылка на превью заказа                                       |
```
* Данные доставки
```
| Поле              | Тип           | Описание                         |
| ----------------- | ------------- | -------------------------------- |
| `DeliveryAddress` | `AddressDTO`  | Адрес доставки                   |
| `Shipping`        | `ShippingDTO` | Информация о способе доставки    |
| `TrackingUrl`     | `string`      | Ссылка для отслеживания доставки |
| `TrackingNumber`  | `string`      | Трек-номер                       |

```
* Информация о пользователе
```
| Поле                    | Тип                     | Описание                                 |
| ----------------------- | ----------------------- | ---------------------------------------- |
| `UserId`                | `number?`               | ID пользователя                          |
| `UserAdditionalInfo`    | `UserAdditionalInfoDto` | Дополнительная информация о пользователе |
| `UserCompanyAccountId`  | `number?`               | ID корпоративного аккаунта               |
| `UserCompanyAccountINN` | `string`                | ИНН компании                             |

```
* Цены и суммы
```
| Поле            | Тип       | Описание                    |
| --------------- | --------- | --------------------------- |
| `Price`         | `decimal` | Базовая стоимость           |
| `DiscountPrice` | `decimal` | Скидка                      |
| `DeliveryPrice` | `decimal` | Стоимость доставки          |
| `TotalPrice`    | `decimal` | Итоговая стоимость          |
| `PaidPrice`     | `decimal` | Оплаченная сумма            |
| `DiscountTitle` | `string`  | Название применённой скидки |
```

#### Пример готовой страницы
```html
<script async src="https://ВАШ_САЙТ_НА_PIXLPARK/api/externalEditor/js"
    onerror="onPxpError('Error while loading init script')"
    onload="onPxpLoaded()">
</script>
<div id="photo-editor" style="position: relative; width: 100%; height: 800px"></div>
<script>
    var pxpEditorContainer = document.getElementById('photo-editor');
    var designEditorConfig = {
        editorType: "site",
        product: {
            id: 554547,
        },
        ui: {
            layoutMode: "auto",
            nextStepButtonAction:'createOrder',
            hideBreadcrumbs:true
        },
        events: {
            onOrderCreated: function (response) {
                console.log(response)
            },
            onReady: function () {
                var loadingCap = document.getElementById("loading_body_cap");
                if (loadingCap != null) {
                    if (loadingCap.parentElement != null) {
                        loadingCap.parentElement.removeChild(loadingCap);
                    }
                }
                document.body.style.overflow = "";
            },
        },
        auth:{
            getToken: ()=>{
                return new Promise((resolve) => {
                    setTimeout(() => {
                        //1. если пользователя не существует 
                        //api.pixlpark.com/api/users/create => id
                        //2. api.pixlpark.com/users/{id}/frontendToken => token
                        resolve("token");
                        }, 1000);
                    });
                },
            },
        isExternal: true,
    }

    function onPxpError(error) {
        pxpEditorContainer.classList.remove("loading-wheel")
        pxpEditorContainer.classList.add("error")
        var errorDiv = document.createElement("div");
        errorDiv.className = "error-message"
        errorDiv.innerText = error;
        pxpEditorContainer.appendChild(errorDiv)
    }
    function onPxpLoaded() {
        var externalEditor = pxp.external.createPhotoEditor(pxpEditorContainer, designEditorConfig);
        externalEditor.render();
        window.photoEditor = externalEditor;
    }    
	
</script>

```