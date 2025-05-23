---
title: Продукты
description: Настройка категорий, продуктов, цен и редакторов для сайта
sidebar_position: 1
---

# Продукты
## Карточка категории
### Базовая информация
* В данном разделе содержится базовая информация о категории:
    + Название категории на сайте.
    + Используемый редактор для приема заказов.
    + Дата последнего изменения категории.
    + Количество прикреплённых шаблонов.
    + Адрес карточки продукта (категории) на сайте.
    + Адрес страницы шаблонов на сайте.
    + Адрес страницы клипартов на сайте.
* ![](../_media/print/category-base.png)

### Список продуктов
* В данном разделе представлен список продуктов категории.
* Также на странице можно:
    + Добавить новый продукт с дублированием существующего или с нуля.
    + Перейти в карточку продукта.
    + Включить или выключить доступность продукта на сайте.
    + Изменить порядок следования продуктов на сайте.
    + Дублировать выделенные продукты.
    + Удалить выделенные продукты.
* ![](../_media/print/category-products.png)

### Основная информация
* В данном разделе представлены основные настройки категории. Рассмотрим некоторых из них более детально.
* __Название на сайте__ - название категории, которое используется при именовании позиции корзины и заказа. Также может использоваться в калькуляторе при отсутствии задания названия категории в его настройках.
* __Название в панели управления__ - название категории в панели управления. В отличие от названия на сайте может содержать в себе еще способ приема заказа.
* __Группа__ - название группы категорий, которое используется для фильтрации категорий на странице списка, а также для формирования в мобильном приложении экрана выбора группы товаров перед выбором категории.
* __Редактор__ - онлайн-редактор для приема заказов на продукцию данной категории.
* __Категория фотогалереи__ - категория фотогалереи категории.
* __Товар по умолчанию__ - товар, который будет выбран по умолчанию в калькуляторе.
* __Позиций в одном ряду калькулятора (ПК и телефон)__ - количество отображаемых позиций в одном ряду для ПК и телефонов.
* __Адрес в интернете__ - адрес страницы карточки продукта на сайте; здесь задается уникальный идентификатор категории, который впоследствии будет участвовать в формирования уникального адреса страницы шаблонов, редактора и идентификатора калькулятора для данной категории. Допустимо использовать цифры `[0-9]`, латиницу в нижнем регистре `[a-z]`, нижнее подчеркивание `[_]`, дефис `[-]` и точку `[.]`.
* ![](../_media/print/category-general.png)

### Страница категории
* В данном разделе задается страница, которая будет выступать на сайте карточкой продукта. Это может быть либо системная страница со строго ограниченным дизайном и набором управляющих элементов, либо произвольная страница из раздела CMS с абсолютно уникальной логикой поведения.
* Мы рекомендуем использовать вариант с произвольной страницей CMS (по образу и подобию тех, которые существуют на демо-сайте Pixlpark).
* ![](../_media/print/category-page.png)

### Хлебные крошки
* В данном разделе осуществляется формирование навигационной цепочки для системных страниц, с которыми работает посетитель сайта до корзины пользователя.
* По правилам хорошего тона хлебные крошки должны содержать полную навигацию от главной страницы сайта до текущего местоположения. 
* ![](../_media/print/category-nav.png)

### Опции
* В данном разделе представлен список опций для продуктов категории.
* Каждую из опций можно либо включить, либо выключить для всех товаров категории, а также изменить их порядок следования на сайте.
* ![](../_media/print/category-options.png)
> Выключение опции в категории продукта приводит к полному выключению данной опции у всех привязанных к ней категорий продуктов.

### Заголовки полей
* В данном разделе можно переопределить различные заголовки полей для категории, которые отображаются на сайте в процессе оформления заказа.
* По умолчанию используются единые для всех категорий константы локализации.
* ![](../_media/print/category-labels.png)

### Метаинформация
* В данном разделе задается информация для поисковых систем (метаинформация) - заголовок, описание и ключевые слова, которые используются для системной страницы категории и страницы редактора.
* ![](../_media/print/category-seo.png)

### Редактор
* Данный раздел состоит из нескольких блоков, содержимое и количество которых зависит от типа редактора категории.
* Перечислим эти блоки:
    + __Основная информация__ - задаются общие параметры работы редактора для всех продуктов категории. Однако их можно переопределить для каждого продукта в отдельности.
    + __Настройка визуализации__ - задаются настройки поверхностей печати для редактора дизайнов.
    + __Настройка внешнего вида__ - задаются настройки внешнего вида и режим работы редактора дизайнов.
    + __Настройка меню__ - задаются настройки бокового меню для редактора дизайнов.
    + __Настройка редактора__ - задаются параметры работы старого редактора дизайнов для настольной и мобильной версии сайта.
    + __Проверка растровых документов__ - задаются параметры проверки растровых документов, загружаемых в редактор проверки макетов.
    + __Проверка PDF документов__ - задаются параметры проверки PDF документов, загружаемых в редактор проверки макетов.
    + __Настройка рендера__ - задается формат или настроенное оборудование для формирования выходных файлов редактора. В сервисе предусмотрено несколько стандартных форматов: TIFF (sRGB), JPEG (sRGB), PNG (sRGB), PDF (sRGB).
    + __Вкладки редактора__ - задаются ссылки, которые отображаются в редакторе в виде вкладок над его рабочей областью. Это необходимо для того, чтобы посетитель сайта имел возможность изменять способ заказа, находясь в редакторе, в случае, когда для одного продукта существует несколько категорий с разными типами редакторов. 
    + __Дополнительные поля__ - задаются дополнительные поля, которые отображаются в редакторе под рабочей областью. Данные, заполненные посетителем сайта в этих полях, в последствии отображаются в заказе в виде сопроводительной информации.
* ![](../_media/print/category-editor.png)
> Настройки старого редактора дизайнов для мобильной версии задаются в подразделе "__Настройки редактора__" раздела "__Редактор__" выбранной категории.
* ![](../_media/print/category-editor-old-design.png)
> Редактор возможно встраивать на внешний сайт. Подробнее об этом можно узнать в [разделе](/dev/editor).

### Калькулятор
* В данном разделе задается механизм расчета стоимости продукции, который в свою очередь может быть пяти типов:
    + __Калькулятор Pixlpark__ - это стандартный механизм расчета стоимости продукции, основанный на стоимости самих продуктов и связанных с ними опциях.
    + __Калькулятор ASystem__ - это механизм расчета стоимости продукции, основанный на импортируемых данных (ценах), называемых шаблонами, из ASystem. Для каждого продукта в ASystem предусмотрел индивидуальный шаблон, который можно выбрать из списка возможных в карточке продукта.
    + __Калькулятор 1С:Полиграфия__ - это механизм расчета стоимости продукции, основанный на импортируемых данных (ценах), называемых шаблонами, из 1С:Полиграфия. Сами шаблоны в формате CSV загружаются в карточках продуктов.
    + __Калькулятор AXIOM__ - это механизм расчета стоимости продукции, основанный на импортируемых данных (ценах), называемых шаблонами, из AXIOM. Для каждого продукта в AXIOM предусмотрел индивидуальный шаблон, который можно выбрать из списка возможных в карточке продукта. 
    + __Калькулятор HelloPrint__ - это механизм расчета стоимости продукции, основанный на импортируемых данных (ценах), называемых шаблонами, из HelloPrint. Для каждого продукта в HelloPrint предусмотрел индивидуальный шаблон, который можно выбрать из списка возможных в карточке продукта.

* Отметим, что по умолчанию доступен лишь __Калькулятор Pixlpark__, а остальные подключаются в разделе "[Заказы / Настройка / Выгрузка заказов / ERP и CRM системы](/orders/settings#erp-и-crm-системы)".
> Программную модель калькулятора можно посмотреть в [разделе](/dev/calc).
* Для каждой категории можно определить несколько вариантов поведения калькулятора. Например, для настольной и мобильной версии внешний вид и логика может отличаться. Наборы настроек для каждого варианта поведения называются представлениями.

* Калькулятор устанавливается на страницы сайта путем размещение одного из нескольких скриптов:
    + __Калькулятор Pixlpark__:
        - `[$calculator(category:%URL-Category%)$]` - для представления "`default`", где `%URL-Category%` - задаваемая часть адреса страницы категории.
        - `[$calculator(category:%URL-Category%, config:%Config-Name%)$]`, для представления "`%Config-Name%`", где `%URL-Category%` - задаваемая часть адреса страницы категории.
    + __Калькулятор ASystem__:
        - `[$asystemcalculator(category:%URL-Category%)$]` - где `%URL-Category%` - задаваемая часть адреса страницы категории.
        - `[$asystemcalculator(category:%URL-Category%, materialId:%Product-ID%)$]` - где `%URL-Category%` - задаваемая часть адреса страницы категории, `%Product-ID%` - идентификатор продукта, с которым должен запуститься калькулятор.
        - `[$asystemcalculator(category:%URL-Category%, materialId:%Product-ID%, afterLoadFunction)$]` - где `%URL-Category%` - задаваемая часть адреса страницы категории, `%Product-ID%` - идентификатор продукта, с которым должен запуститься калькулятор, `afterLoadFunction` - JS-функция, запускаемая после создания калькулятора на странице сайта.
    + __Калькулятор 1С:Полиграфия__:
        - `[$poly1ccalculator(category:%URL-Category%)$]` - где `%URL-Category%` - задаваемая часть адреса страницы категории.
        - `[$poly1ccalculator(category:%URL-Category%, materialId:%Product-ID%)$]` - где `%URL-Category%` - задаваемая часть адреса страницы категории, `%Product-ID%` - идентификатор продукта, с которым должен запуститься калькулятор.
        - `[$poly1ccalculator(category:%URL-Category%, materialId:%Product-ID%, afterLoadFunction)$]` - где `%URL-Category%` - задаваемая часть адреса страницы категории, `%Product-ID%` - идентификатор продукта, с которым должен запуститься калькулятор, `afterLoadFunction` - JS-функция, запускаемая после создания калькулятора на странице сайта.
    + __Калькулятор AXIOM__:
        - `[$axiomculator(category:%URL-Category%)$]` - где `%URL-Category%` - задаваемая часть адреса страницы категории.
        - `[$axiomculator(category:%URL-Category%, materialId:%Product-ID%)$]` - где `%URL-Category%` - задаваемая часть адреса страницы категории, `%Product-ID%` - идентификатор продукта, с которым должен запуститься калькулятор.
        - `[$axiomculator(category:%URL-Category%, materialId:%Product-ID%, afterLoadFunction)$]` - где `%URL-Category%` - задаваемая часть адреса страницы категории, `%Product-ID%` - идентификатор продукта, с которым должен запуститься калькулятор, `afterLoadFunction` - JS-функция, запускаемая после создания калькулятора на странице сайта.
    + __Калькулятор HelloPrint__:
        - `[$helloprintcalculator(category:%URL-Category%)$]` - где `%URL-Category%` - задаваемая часть адреса страницы категории.
        - `[$helloprintcalculator(category:%URL-Category%, materialId:%Product-ID%)$]` - где `%URL-Category%` - задаваемая часть адреса страницы категории, `%Product-ID%` - идентификатор продукта, с которым должен запуститься калькулятор.
        - `[$helloprintcalculator(category:%URL-Category%, materialId:%Product-ID%, afterLoadFunction)$]` - где `%URL-Category%` - задаваемая часть адреса страницы категории, `%Product-ID%` - идентификатор продукта, с которым должен запуститься калькулятор, `afterLoadFunction` - JS-функция, запускаемая после создания калькулятора на странице сайта.
* ![](../_media/print/category-calc-base.png)
> Об установке калькулятора на внешний сайт можно узнать в [разделе](/dev/calc-install).
* Настройки калькулятора сгруппированы в несколько блоков:
    + __Основная информация__ - задаются общие настройки калькулятора.
    ![](../_media/print/category-calc-general.png)
    + __Продукты__ - задаются настройки работы с продуктами, включающие работу с категориями, атрибутами и товарами.
    ![](../_media/print/category-calc-products.png)
    + __Тиражи__ - задаются настройки работы с тиражностью, включающие работу с поверхностями и формулами их преобразования.
    ![](../_media/print/category-calc-items.png)
    + __Опции__ - задаются настройки работы с опциями.
    ![](../_media/print/category-calc-options.png)
    + __Оформление__ - задаются скрипты и стили для визуализации калькулятора.

### Атрибуты
* __Атрибуты__ - это характеристики продукта, описывающие его семантику. Использование атрибутов упрощает выбор нужного продукта в калькуляторе или редакторе - вместо выбора нужного продукта из длинного списка посетителю сайта потребуется лишь выбрать значения нескольких атрибутов.
* Например, на демонстрационном сайте Pixlpark есть категория "Холсты в раму", содержащая 288 продуктов. Вместо неудобного выбора нужного продукта из большого списка требуется лишь выбрать значения нескольких атрибутов: ориентация, размер, цвет рамы и паспорту.
* В данном разделе задается список атрибутов для всех продуктов категории, а также их логика отображения и поведения на сайте. Значения атрибутов задаются в карточках продуктов.
* ![](../_media/print/category-attributes.png)

### Дизайны 
* Данный раздел состоит из нескольких блоков, содержимое и количество которых зависит от типа редактора категории.
* Перечислим эти блоки:
    + __Основная информация__ - задается общее поведение страницы списка шаблонов и клипартов на сайте.
    ![](../_media/print/category-design-general.png)
    + __Настройки отображения__ - задается логика отображения элементов на странице списка шаблонов и клипартов на сайте.
    ![](../_media/print/category-design-view.png)
    + __Настройки отображения__ - задается 3D-макет продукта для эмуляции предпросмотра товаров на странице списка шаблонов и товаров. Отметим, что в карточке продукта можно переопределить данный общий макет индивидуальным.
    ![](../_media/print/category-design-mockups.png)


## Карточка продукта
* __Содержание__
    + [Базовая информация](/print/products#базовая-информация-1)
    + [Основная информация](/print/products#основная-информация-1)
    + [Тиражность](/print/products#тиражность)
    + [Опции](/print/products#опции-1)
    + [Артикулы](/print/products#артикулы)
    + [Шаблон калькулятора](/print/products#шаблон-калькулятора)
    + [Редактор](/print/products#редактор-1)
    + [3D-модель](/print/products#3d-модель)
    + [Калькулятор](/print/products#калькулятор-1)
    + [Атрибуты](/print/products#атрибуты-1)
* > Подробное описание настройки калькулятора для продукта категории можно посмотреть в [разделе](/calculators/printing).

### Базовая информация
* В данном разделе содержится базовая информация про:
    + Используемый редактор для приема заказов.
    + Дата последнего изменения категории.
    + Адрес карточки продукта (категории) на сайте.
* ![](../_media/print/product-base.png)

### Основная информация
* В данном разделе представлены основные настройки продукта. Рассмотрим некоторых из них более детально.
* __Название на сайте__ - название продукта, которое используется при именовании позиции корзины и заказа. Также может использоваться в калькуляторе, если название продукта не задано в его настройках.
* __Название в панели управления__ - название продукта в панели управления. В отличие от названия на сайте, может содержать в себе дополнительную техническую информацию (например, значение атрибутов).
* __Название в папке заказа__ - название продукта (на латинице), которое может использоваться вместе "названия на сайте" при формировании названия папки элемента заказа. 
* __Название в имени выходного файла__ - название продукта на латинице, которое может использоваться вместе "названия на сайте" при формировании имени выходного файла при включенной настройке категории "Использовать опции для формирования имен выходных файлов".
* __Описание в системной странице категории__ - описание, которое выводится в таблице выбора продуктов на системной странице категории.
* __Описание в калькуляторе__ - описание, которое выводится у товара в калькуляторе в случае выбора параметра "Внешний вид товаров" в "Описание для калькулятора".
* __Вывод цены на странице__ - константа вывода стоимости продукта (с заданным тиражом и количеством страниц) на произвольную страницу CMS.
* __Вывод цены с опциями__ - константа вывода стоимости продукта вместе с минимально возможными значениями по цене и обязательными к выбору опциями на произвольную страницу CMS.
* __Вывод цены за единицу товара__ - константа вывода стоимости единицы продукта (с заданным тиражом и количеством страниц) на произвольную страницу CMS.
* __Адрес в интернете__ - адрес страницы редактора на сайте для текущего продукта; здесь задается уникальный идентификатор продукта, который участвует в формировании адреса. Допустимо использовать цифры `[0-9]`, латиницу в нижнем регистре `[a-z]`, нижнее подчеркивание `[_]`, дефис `[-]` и точку `[.]`.
* __Вес продукта__ - вес продукта, который учитывается при расчете стоимости доставки.
* __Обложка__ - иллюстрация, которая отображается в корзине для позиции заказа; используется для всех редакторов, кроме текущего и старого редактора дизайнов, а также редактора интерьера.
* ![](../_media/print/product-general.png)

### Тиражность
* В данном разделе задается расчет стоимости продукции, а также алгоритм выбора тиража на сайте.
* Предусмотрено несколько вариантов тиражности:
    + __Произвольный тираж__ - стоимость одного продукта может быть разной для заданных диапазонов тиражности. Данный вариант применим, например, для фотокниг.
    + __Предзаданные тиражи__ - наборы тиражей с фиксированной стоимостью.  Данный вариант применим, например, для визиток.
    + __Тиражи другого продукта__ - в этом случае продукт использует настройки тиражности другого выбранного продукта.
* Для многостраничных продуктов (например, фотокниг) можно задать минимальное и максимальное количество страниц с шагом роста и дополнительной стоимостью одной страницы. При этом при задании цены в вариантах тиражности учитывается стоимость продукта с минимальным количеством страниц.
* ![](../_media/print/product-items.png)

### Опции
* В данном разделе представлен список опций для данного продукта.
* Каждую из опций можно либо включить, либо выключить, а также изменить их порядок следования на сайте.
* ![](../_media/print/product-options.png)

### Артикулы
* В данном разделе представлен список артикулов для данного продукта.
* ![](../_media/print/product-sku.png)

### Шаблон калькулятора
* Данный раздел отображается только если подключена интеграция с одной из [перечисленных ERP-систем](/orders/settings#erp-и-crm-системы).
* В нем можно либо выбрать шаблон продукта, полученный с сервера учетной системы, либо загрузить его самостоятельно (1С:Полиграфия).
* ![](../_media/print/product-cacl-template.png)

### Редактор
* В данном разделе задаются параметры редактора для данного продукта, а также можно переопределить общие настройки редактора, заданные в карточке категории.
* ![](../_media/print/product-editor.png)

### 3D-модель
* В данном разделе задается 3D-макет продукта, который используется для визуализации как на странице списка шаблонов и принтов, так и в онлайн-редакторе.
* Подробнее о подготовке 3D-моделей можно почитать в разделе документации "[Дизайнерам / 3D-модели для предпросмотра](/design/3d)".
* ![](../_media/print/product-3d.png)

### Калькулятор
* В данном разделе можно переопределить настройки калькулятора, заданные в карточке категории для всех ее продуктов.
* ![](../_media/print/product-calc.png)

### Атрибуты
* В данном разделе для каждого атрибута, определенного в карточке категории, задаются:
    + __Значения атрибутов__;
    + __Описание__:
        - __Для калькулятора__ - выводится в калькуляторе под значением атрибута (только если продукты выбираются через кнопки).
        - __Для подсказки калькулятора__ - выводится в калькуляторе в поп-ап окне, появляющемся при наведении на иконку вопроса у позиции.
        - __Для редактора__ - выводится в редакторе под значением атрибута, если их переключение настроено в виде радио-кнопок.
* ![](../_media/print/product-attrubutes.png)

## Список категорий
* В данном разделе представлен список категорий продуктов, которые можно отфильтровать:
    + __По группе__, задаваемой в настройках категории.
    + __По редактору__, используемому товарами категории для приёма заказов.
    + __По подрядчику__, связанному с какими-либо категориями.
    + __По доступности__ категории на сайте или в приложении.
        - __Не учитывать__ - все категории.
        - __Везде__ - категории, доступные и на сайте, и в приложении.
        - __Нигде__ - категории, которые нигде не доступны.
        - __Только на сайте__ - категории, доступные только на сайте.
        - __Только в приложении__ - категории, доступные только в приложении.
        - __На сайте или в приложении__ - категории, доступные на сайте или в приложении.
* Также в блоке фильтра последним элементом расположен блок "__Атрибуты__", в зависимости от которого в списке категорий будут или не будут отображаться их атрибуты.
* ![](../_media/print/categories.png)
* В левом верхнем углу расположена кнопка "__Добавить / Обновить__", которая позволяет выполнить следующие действия:
    + __Скопировать категорию с демо-сайта__ со всеми товарами и связанными с ними опциями.
    + __Дублировать существующую категорию__ со всеми товарами и связанными с ними опциями. В зависимости от настроек продукты дублированной категории могут наследоваться от исходной.
    + __Создать новую категорию__ с заданием её названия и выбором редактора.
    + __Обновить данные выбранных категорий__, для чего нужно:
        - Экспортировать данные выбранных категорий в эксель-файл.
        - Изменить данные в эксель-файле:
            - Во вкладке "__Категории__" можно изменить название и URL-адрес категорий.
            - Во вкладке "__Товары__" можно изменить название, URL-адрес, тиражность и стоимость товаров.
            - Во вкладке "__Опции__" можно изменить название опций, а также название и стоимость их позиций.
        - Импортировать данные по категориям из эксель-файла.
* ![](../_media/print/categories-add.png)
* Также на странице можно:
    + Перейти в карточку любой категории.
    + Включить или выключить доступность любой категории для сайта или приложения.
    + Изменить порядок следования категорий на сайте и в приложении.
    + Обновить цены выбранных категорий.
    + Дублировать выбранные категории (без наследования, но со всеми продуктами и опциями).
    + Удалить выбранные категории.
* Т.к. стоимость продукции не является дискретной величиной, то для обновления цен вводятся новые понятия:
    + __Тип цены__:
        - Базовая цена продукта.
        - Цена шага роста многостраничного продукта.
        - Цена поверхности.
        - Цена опции.
        - Цена позиции опции.
    + __Коэффициент__, на который нужно умножить каждый тип цены.
    + __Округление__ стоимости после применения коэффициента:
        - До четырех знаков после запятой.
        - До трех знаков после запятой.
        - До двух знаков после запятой.
        - До одного знака после запятой.
        - До целых.
        - До десятков.
        - До сотен.
* ![](../_media/print/categories-price.png)

## Группы
* В данном разделе представлен список групп категорий, каждая из которых обладает следующим набором характеристик:
    + __Изображение__ - изображение группы категорий;
    + __Название на сайте__ - название группы на сайте; 
    + __Название в панели управления__ - название группы в панели управления;
    + __URL__ - адрес страницы группы категорий на сайте; здесь задается уникальный идентификатор группы, который впоследствии будет участвовать в формирования уникального адреса страницы. Допустимо использовать цифры `[0-9]`, латиницу в нижнем регистре `[a-z]`, нижнее подчеркивание `[_]`, дефис `[-]` и точку `[.]`;
    + __Категория фотогалереи__ - категория фотогалереи группы категорий;
    + __Количество категорий__ - количество категорий состоящих в группе;
    + __Статус__ - доступность группы на сайте;
    + __Фон__ - цвет фона категорий группы.
* ![](../_media/print/groups.png)