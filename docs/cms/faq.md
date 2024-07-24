---
title: FAQ
description: Ответы на популярные вопросы по работе с разделом
sidebar_position: 7
---

# Ответы на популярные вопросы
## Как использовать константы
### CMS
* `[$navigation(main)$]` - навигационное меню с идентификатором __main__.
* `[$slider(main)$]` - баннер с идентификатором __main__.
* `[$breadcrumbs$]` - хлебные крошки текущей страницы.
* `[$favoriteFeedbacks$]` - избранные отзывы клиентов из раздела "__Отзывы / Гостевая книга / Избранные__".
* `[$lastNews$]` - список последних опубликованных новостей, где их количество задается в разделе “__Новости / Настройка__“.
* `[$appLinks$]` - кнопки мобильных приложений со ссылками на них в App Store и Google Play.
* `[$fullPath$]` - значение константы локализации, где __fullPath__ - ее путь.
* `[$portfolio(category:prints) $]` - примеры работ, где __prints__ - URL категории фотогалереи или категории печати.

### Доставка
* `[$delivery:external$]` - карта со всеми способами доставки.
* `[$delivery:pickPointMap$]` - карта с собственными точками выдачи.
* `[$delivery:locationSelector$]` - выбор города в шапке сайта.

### Контакты
* `[$websiteTitle$]` - название бренда из раздела “__Настройка / Регион → Контакты__”.
* `[$websiteCity$]` - город из раздела “Настройка / Регион → Контакты”.
* `[$websiteAddress$]` - адрес из раздела “Настройка / Регион → Контакты”.
* `[$websiteEmail$]` - эл. почта из раздела “Настройка / Регион → Контакты”.
* `[$websitePhone$]` - телефон из раздела “Настройка / Регион → Контакты”.
* `[$websiteTelegram$]` - telegram из раздела “Настройка / Регион → Контакты”.
* `[$websiteLogo$]` - абсолютная ссылка на логотип сайта из раздела “__CMS / Дизайн__”.
* `[$websiteDomain$]` - доменное имя сайта из раздела “__Настройка / Домены__”.

### Реквизиты
* `[$requisite:name$]` - название юридического лица из раздела "__Настройка / Оплата / Реквизиты__".
* `[$requisite:ceo$]` - директор.
* `[$requisite:kpp$]` - КПП.
* `[$requisite:inn$]` - ИНН.
* `[$requisite:ogrn$]` - ОГРН.
* `[$requisite:bank$]` - наименование банка.
* `[$requisite:bic$]` - БИК.
* `[$requisite:paymentAccount$]` - расчетный счет.
* `[$requisite:correspondentAccount$]` - корреспондентский счёт.
* `[$requisite:legalAddress$]` - юридический адрес.
* `[$requisite:postalAddress$]` - почтовый адрес.
* `[$requisite:stampUrl$]` - ссылка на иллюстрацию печати.
* `[$requisite:signatureUrl$]` - ссылка на иллюстрацию подписи.

### Магазин
* `[$shop$]` - список категорий из раздела "__Магазин / Продукты__".
* `[$shop(group:name)$]` - список категорий, где __name__ - название группы категорий.

### Сувениры
* `[$gifts$]` - список категорий и подкатегорий из раздела "__Сувениры / Продукты__" без функции поиска.
* `[$gifts(isSearchable:true)$]` - список категорий и подкатегорий с функцией поиска.

### Дизайны
* `templates(type:templates, category:cUrl, product:pUrl, title:"Дизайны", count:4)` - произвольные шаблоны из раздела "__Печать / Дизайны / Шаблоны__", где:
    + cUrl - URL категории;
    + pUrl  - URL продукта;
    + Дизайны  - опциональный заголовок блока;
    + 4 - количество шаблонов.
* `templates(type:cliparts, category:cUrl, product:pUrl, title:"Дизайны", count:4)` - произвольные клипарты.

### Печать
* `[$categories(group:gUrl)$]` - список категорий печати из раздела "__Печать / Продукты__", где __gUrl__ - URL группы категорий.
* `[$categories(isPopular:true, max:8)$]` - список из 8 популярных групп печати, упорядоченных по порядку панели управления.
* `[$categoryCover(cUrl)$]` - обложка категории, где __cUrl__ - URL категории.
* `[$categoryEditorUrl(category: cUrl)$]` ссылка на редактор, где __cUrl__ - URL категории.
* `[$productName(category:cUrl, product:pUrl)$]` - название продукта, __cUrl__ - URL категории, а __pUrl__ - URL продукта.
* `[$price(category:cUrl, product:pUrl, quantity:qVal, page:pVal, surface: sVal, zone: zVal)$]` - стоимость продукта без учета опций, где:
    + cUrl и pUrl - описаны выше (обязательные параметры);
    + qVal - количество продуктов (опциональный параметр, по умолчанию = 1);
    + pVal - количество поверхностей печати (опциональный параметр, по умолчанию = 1);
    + sVal и zVal - порядковые номера поверхности и зоны печати, для которых нужно произвести расчет стоимости; используется вместе и без параметра “page”; например, если требуется рассчитать стоимость печати футболки на спине А4  (опциональные параметры).
* `[$priceWithCustomWorks(category:cUrl, product:pUrl, qantity:qVal, page:pVal, surface: sVal, zone: zVal)$]` - стоимость продукта с учетом обязательных опций.
* `[$pricePerItem(category:cUrl, product:pUrl, qantity:qVal, page:pVal, surface: sVal, zone: zVal)$]` - стоимость единицы продукта без учета опций.
* `[$priceString(...)$], [$ priceWithCustomWorksString(...)$], [$ pricePerItemString(...)$]` - стоимость вместе с валютой сайта.
* `[$calculator(category:cUrl, product:pUrl, config:view)$]` - калькулятор для категории печати, где:
    + cUrl - URL категории (обязательный параметр);
    + pUrl - URL продукта, который будет выбран по умолчанию (опциональный параметр);
    + view - название представления калькулятора (опциональный параметр).
* `[$axiomcalculator(category:cUrl, product:pUrl)$]` - калькулятор для категории печати с подключенной ERP Axiom.
* `[$poly1ccalculator(category:cUrl, product:pUrl)$]` - калькулятор для категории печати с подключенной ERP 1С:Полиграфия.
* `[$asystemcalculator(category:cUrl, product:pUrl)$]` - калькулятор для категории печати с подключенной ERP ASystem.
* `[$helloprintcalculator(category:cUrl, product:pUrl)$]` - калькулятор для категории печати с подключенной ERP HelloPrint.

## Как подключить онлайн-чат на сайт
* Для подключения онлайн-чата, виджета обратного звонка или другого подобного сервиса необходимо разместить код данного виджета во __втором поле__ раздела “__CMS / Страницы / Скрипты__”.
* ![](../_media/cms/faq01.png)
* Если же требуется, чтобы виджет отрабатывал не на всех страницах сайта, то тогда необходимо:
    + Перейти в раздел “__CMS / Слои__”;
* ![](../_media/cms/faq02.png)
    + Создать новый слой, указав в нем маску с исключенными страницами;
* ![](../_media/cms/faq03.png)
    + Разместить код виджета в __секции “JavaScript”__.
* ![](../_media/cms/faq04.png)
* Например, на демо-сайте виджет онлайн-чата отображается на всех страницах кроме редактора. В этом случае в слое указывается маска: “__-url(*/editor*)__".
* Подробнее о форматировании маски можно прочитать в соответствующем [разделе документации](/cms/pages#задание-маски-слоя).


## Видеоуроки
### Редактирование страниц сайта
<iframe width="840" height="473" src="https://www.youtube.com/embed/oz3NFaSBWAs?si=yO56YYUXjStnTvnr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Как подключить онлайн-чат на сайт
<iframe width="840" height="473" src="https://www.youtube.com/embed/fwO_SiWLUTA?si=ainvKvJ5NqErVvWk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
