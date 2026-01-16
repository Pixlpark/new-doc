---
title: Внедрение онлайн-редактора
description: Внедрение редактора во внешний интернет-магазин с собственной корзиной, оплатой и доставкой
sidebar_position: 5
---

# Внедрение онлайн-редактора
* Редактор дизайнов можно использовать на внешнем (относительно сайта на платформе Pixlpark) сайте. Например, на сайтах использующих такие CMS как WordPress, 1С-Битрикс, Joomla и прочие.
* Редактор встраивается в несколько этапов:
    1. [Настройка платформы Pixlpark](/dev/editor#настройка-платформы-pixlpark).
    2. [Встраивание редактора на страницу сайта](/dev/editor#встраивание-редактора-на-страницу-сайта).
    3. [Получение файлов к печати](/dev/editor#получение-файлов-к-печати).
* [Пример готовой страницы](/dev/editor#пример-готовой-страницы).
## Настройка платформы Pixlpark
* Для того, чтобы встроить редактор дизайнов в сторонний сайт, вам необходимо следующим образом подготовить сайт на платформе Pixlpark (откуда подтягиваются все настройки для редактора):
    + Содержит доступную и настроенную категорию продукта и продукт с уникальной ссылкой в редактор, который необходимо интегрировать.
    + В подразделе "__Основные настройки__" раздела "__Настройки / Доступ__" включить опцию "__Разрешить встраивать сайт на внешние ресурсы (сайт должен работать с защищенным протоколом HTTPS и на поддомене ресурса)__" и указать внешний домен с протоколом на который будет встроен редактор.
    + В подразделе "__Доступность API__" раздела "__Настройки / Доступ__" включена опция "__Разрешить доступ к данным через API__".
    + Находится на поддомене внешнего сайта, куда необходимо интегрировать редактор. Подробнее о настройках доменного имени можно узнать на [странице](https://docs.pixlpark.ru/site/domains).
* Внешний сайт должен работать на протоколе HTTPS.
* Предположим что ваш сайт находится на https://site.ru
![](../_media/dev/api-settings.png ':size=80%')
Сайт pixlpark вы расположили на домене https://editor.site.ru
![](../_media/dev/domain-settings.png ':size=80%')
* Интеграция необходимого редактора с внешним сайтом осуществляется при помощи идентификатора продукта, который может быть двух видов:
    + "__ID__" - уникальный идентификатор продукта. При удалении с сайта на платформе Pixlpark продукта с указанным во встраиваемом редакторе ID, на внешнем сайте редактор работать не будет.
    + "__categoryUrlName__" и "__productUrlName__" - идентификатор категории продукта и идентификатор продукта в URL. При отсутствии указания "__productUrlName__" редактор будет инициализирован первым доступным продуктом категории продукта.



## Встраивание редактора на страницу сайта
* Редактор встраивается в два этапа:
    1. [Подготовка страницы внешнего сайта](/dev/editor#подготовка-страницы-внешнего-сайта).
    2. [Конфигурация](/dev/editor#конфигурация).

### Подготовка страницы внешнего сайта
* Для встраивания редактора на страницу внешнего сайта необходимо создать контейнер согласно коду
```html
<div id="editorContainer"></div>
```
* и добавить его в разметку страницы внешнего сайта. Редактор заполнит весь размер контейнера.
* Затем, добавить скрипт для загрузки редактора на страницу внешнего сайта.
```js
<script src="https://ваш-сайт-в-Pixlpark/api/externalEditor/js" onerror="onPxpError('Error')" onload="onPxpLoaded()"></script>
```
* Например:
```js
<script src="https://editor.site.ru/api/externalEditor/js" onerror="onPxpError('Error')" onload="onPxpLoaded()"></script>
```
## Редактор дизайнов
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
    // то используйте userToken, иначе getToken
    auth: {
        // Этот метод будет вызван если не задан userToken
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
### Определение конфигурации редактора
* Редактор работает с определенным пользователем.
* Для получения токена пользователя необходимо реализовать взаимодействие с API Pixlpark.
* Необходимо получить или создать (при отсутствии данного пользователя на сайте в сервисе Pixlpark) через API Pixlpark и получить внешний токен:
    + `GET api.pixlpark.com/users/byEmail` и/или `POST api.pixlpark.com/users/create`.
    + `GET api.pixlpark.com/users/{id}/frontendToken`.
* Информацию о работе данных методов вы можете получить на странице https://api.pixlpark.com

#### Конфигурация
* Определить конфигурацию редактора на странице внешнего сайта необходимо при помощи кода:
```js
const container = document.getElementById('editorContainer');
const designEditorConfig = {
    product: {
        id: ID_товара
        //либо
        //productUrlName: "идентификатор_продукта", //например, "50x90-one-sided"
        //categoryUrlName: "идентификатор_категории_продукта", //например, "businesscards-template"
    },
    auth: {
        // Этот метод будет вызван если не задан userToken
        // В этом методе необходимо найти или создать пользователя на стороне Pixlpark,
        // связать его с авторизованным пользователем вашей платформы
        //  и вернуть его token на платформе Pixlpark
        getToken: () => {
            return new Promise((resolve, reject) => {
                //`GET api.pixlpark.com/users/byEmail` и/или `POST api.pixlpark.com/users/create`
                //`GET api.pixlpark.com/users/{id}/frontendToken`
                resolve('token');
            })
        },
        // Токен зарегистрированного пользователя
        // При его указании редактор попробует войти под этим токеном
        // Если не получится, редактор завершит работу с ошибкой
        userToken: undefined,
    },
    ui: {
        layoutMode: "auto",
    },
    events: {
        onError: (error) => { onPxpError(error); },
        onReady: () => {
            console.log("Editor ready");
        },
        onCartItemCreated: (response) => {
            console.log(`Положили товар в корзину: ${response.shoppingCartItemId}.`);
        },
        onOrderCreated: (response) => {
            console.log(`Создали заказ: ${response.orderId}`);
        },
        onPriceChanged: (newPrice) => {
            console.log("New price recieved", newPrice);
        }
    },
}
// Обработчик ошибок
function onPxpError(error) {}
// Этот код вызывается после загрузки скрипта редактора
function onPxpLoaded() {
    var editor = pxp.external.createDesignEditor(container, designEditorConfig);
    editor.render();
    window.editor = editor;
}
```
> Скрипт необходимо расположить после скрипта загрузки редактора.
### Дополнительные методы управления редактором
* Объект `window.editor` предоставляет набор методов для более гибкого управления редактором. С их помощью вы можете реализовывать собственные сценарии взаимодействия, а также создавать кастомные кнопки и элементы интерфейса, которые будут напрямую управлять редактором.
* Например, вы можете:
    + Принудительно создать заказ или добавить товар в корзину
    + Открыть предпросмотр
    + Переключить полноэкранный режим
    + Добавлять и удалять развороты
    + Получать актуальную цену
    + Управлять файлами проекта
    + Обновлять конфигурацию на лету
    + Скроллить к нужной странице
    + Экспортировать SVG
* И многое другое
* Полный список доступных методов можно посмотреть, вызвав в консоли: `window.editor`
* Это позволяет интегрировать редактор в ваш интерфейс максимально гибко и под ваши бизнес-сценарии.
## Редактор фотопечати
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
    // то используйте userToken, иначе getToken
    auth: {
        // Этот метод будет вызван если не задан userToken
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
### Определение конфигурации редактора
* Редактор работает с определенным пользователем.
* Для получения токена пользователя необходимо реализовать взаимодействие с API Pixlpark.
* Необходимо получить или создать (при отсутствии данного пользователя на сайте в сервисе Pixlpark) через API Pixlpark и получить внешний токен:
    + `GET api.pixlpark.com/users/byEmail` и/или `POST api.pixlpark.com/users/create`.
    + `GET api.pixlpark.com/users/{id}/frontendToken`.
* Информацию о работе данных методов вы можете получить на странице https://api.pixlpark.com
#### Конфигурация
* Определить конфигурацию редактора на странице внешнего сайта необходимо при помощи кода:
```js
const container = document.getElementById('editorContainer');
const photoEditorConfig = {
    product: {
        id: 554547 // ID товара
    },
    auth: {
        // Этот метод будет вызван если не задан userToken
        // В этом методе необходимо найти или создать пользователя на стороне Pixlpark,
        // связать его с авторизованным пользователем вашей платформы
        //  и вернуть его token на платформе Pixlpark
        getToken: () => {
            return new Promise((resolve, reject) => {
                //`GET api.pixlpark.com/users/byEmail` и/или `POST api.pixlpark.com/users/create`
                //`GET api.pixlpark.com/users/{id}/frontendToken`
                resolve('token');
            })
        },
        // Токен зарегистрированного пользователя
        // При его указании редактор попробует войти под этим токеном
        // Если не получится, редактор завершит работу с ошибкой
        userToken: undefined,
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
        onOrderCreated: (response) => {
            console.log(`Создали заказ: ${response.orderId}.`);
        },
        onPriceChanged: (newPrice) => {
            console.log("New price recieved", newPrice);
        }
    },
}
// Обработчик ошибок
function onPxpError(error) {
}
// Этот код вызывается после загрузки скрипта редактора
function onPxpLoaded() {
    var editor = pxp.external.createPhotoEditor(container, photoEditorConfig);
    editor.render();
    window.editor = editor;
}
```
> Скрипт необходимо расположить после скрипта загрузки редактора.
### Дополнительные методы управления редактором
* Объект `window.editor` предоставляет набор методов для более гибкого управления редактором. С их помощью вы можете реализовывать собственные сценарии взаимодействия, а также создавать кастомные кнопки и элементы интерфейса, которые будут напрямую управлять редактором.
* Например, вы можете:
    + Добавить в корзину `window.editor.createOrder()`
    + Создать заказ `window.editor.createOrderForce()`
* И многое другое
* Полный список доступных методов можно посмотреть, вызвав в консоли: `window.editor`
* Это позволяет интегрировать редактор в ваш интерфейс максимально гибко и под ваши бизнес-сценарии.

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
* После нажатия кнопки "__Заказать__" либо вызове `window.editor.addToCart()` (для редактора фотопечати: `window.editor.createOrder()`) в модальном окне утверждения дизайна редактора, заказываемый продукт добавляется в корзину Pixlpark. Затем отображается реализованный на внешнем сайте хэндлер `onCartItemCreated`, в который передается идентификатор пользователя (`userId`) и идентификатор позиции корзины (`shoppingCartItemId`) Pixlpark.
* Далее, в `onCartItemCreated` необходимо:
    + Закрыть редактор (например, если он был в div-элементе).
    + Добавить позицию в корзину внешнего сайта.
    + Инициировать подготовку файлов для печати.
* При желании к позиции корзины внешнего сайта можно прикрепить превью созданного дизайна, которое находится у соответствующего элемента корзины Pixlpark. Для этого нужно с помощью [API-метода](https://docs.pixlpark.ru/dev/api) __Get By UserId__ (`/cart/{userId}`) получить всю корзину, а уже затем найти интересующий элемент по `shoppingCartItemId`.
* Отметим, что корзина Pixlpark хранится ровно 14 дней. После чего ее содержимое удаляется. Поэтому, на внешнем сайте надо либо предусмотреть аналогичную логику с уведомлением клиента об очистке корзины, либо в этот срок инициировать подготовку файлов для печати.
* Для создания заказа необходимо:
    + С помощью [API-метода](https://docs.pixlpark.ru/dev/api) __Create Order__ (https://api.pixlpark.com/orders/create) необходимо создать заказ, передав в качестве его параметров __userId__, __shoppingCartItemId__ и __shippingId__, где __shippingId__ - это идентификатор любой активной доставки, определенной в панели управления Pixlpark в разделе "__Настройка / Доставка / Способы доставки__".
![](../_media/dev/editor-shipping-id.png ':size=80%')

### Сценарий 2: Автоматическое создание заказа (createOrder)
* При использовании режима `createOrder` товар не добавляется в корзину, а заказ создаётся сразу.
* Как это работает:
    + После нажатия кнопки "__Заказать__" либо вызове `window.editor.createOrderForce()` редактор сразу создаёт заказ в Pixlpark.

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

| Поле            | Тип         | Описание                                                     |
| --- | ---  |--- |
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

* Данные доставки

| Поле              | Тип           | Описание                         |
| ---  | ---  | ---  |
| `DeliveryAddress` | `AddressDTO`  | Адрес доставки                   |
| `Shipping`        | `ShippingDTO` | Информация о способе доставки    |
| `TrackingUrl`     | `string`      | Ссылка для отслеживания доставки |
| `TrackingNumber`  | `string`      | Трек-номер                       |

* Информация о пользователе

| Поле                    | Тип                     | Описание                                 |
| --- | --- | --- |
| `UserId`                | `number?`               | ID пользователя                          |
| `UserAdditionalInfo`    | `UserAdditionalInfoDto` | Дополнительная информация о пользователе |
| `UserCompanyAccountId`  | `number?`               | ID корпоративного аккаунта               |
| `UserCompanyAccountINN` | `string`                | ИНН компании                             |

* Цены и суммы

| Поле            | Тип       | Описание                    |
| --- | --- | --- |
| `Price`         | `decimal` | Базовая стоимость           |
| `DiscountPrice` | `decimal` | Скидка                      |
| `DeliveryPrice` | `decimal` | Стоимость доставки          |
| `TotalPrice`    | `decimal` | Итоговая стоимость          |
| `PaidPrice`     | `decimal` | Оплаченная сумма            |
| `DiscountTitle` | `string`  | Название применённой скидки |

## Пример готовой страницы
### Редактор дизайнов
```html
<script async src="https://demo.pixlpark.ru/api/externalEditor/js"
    onerror="onPxpError('Error while loading init script')"
    onload="onPxpLoaded()">
</script>
<div id="vector-editor"></div>
<script>
    var pxpEditorContainer = document.getElementById('vector-editor');
    var vectorEditorConfig = {
        editorType: "site",
        product: {
            id: 1594332,
        },
        ui: {
            layoutMode: "auto",
            nextStepButtonAction:'createOrder',
            header:
            {
                breadCrumbs:false
            }
        },
        events: {
            onOrderCreated: function (response) {
                console.log(response)
            },
            onReady: function () {
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

    function onPxpError(error) {    }
    function onPxpLoaded() {
        var externalEditor = pxp.external.createDesignEditor(pxpEditorContainer, vectorEditorConfig);
        externalEditor.render();
        window.editor = externalEditor;
    }    
	
</script>
```
### Редактор фотопечати
```html
<script async src="https://demo.pixlpark.ru/api/externalEditor/js"
    onerror="onPxpError('Error while loading init script')"
    onload="onPxpLoaded()">
</script>
<div id="photo-editor"></div>
<script>
    var pxpEditorContainer = document.getElementById('photo-editor');
    var photoEditorConfig = {
        editorType: "site",
        product: {
            id: 554547,
        },
        ui: {
            layoutMode: "auto",
            nextStepButtonAction:'createOrder',
        },
        events: {
            onOrderCreated: function (response) {
                console.log(response)
            },
            onReady: function () {
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

    function onPxpError(error) {    }
    function onPxpLoaded() {
        var externalEditor = pxp.external.createPhotoEditor(pxpEditorContainer, photoEditorConfig);
        externalEditor.render();
        window.editor = externalEditor;
    }    
	
</script>
```