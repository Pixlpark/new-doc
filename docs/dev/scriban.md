---
title: Настройка шаблона документа
description: Спецификация языка разметки Scriban для настройки шаблонов документов
sidebar_position: 2
---

# Спецификация языка разметки Scriban
* __Scriban__ — это быстрый, безопасный и мощный язык для создания текстовых шаблонов. Здесь будут рассмотрены некоторые из его возможностей.

## Базовые конструкции
* Важно запомнить, что все конструкции языка заключаются в двойные фигурные скобки, которые заменяются на соответствующие им результирующие строки в процессе обработки шаблона. Например:
* `{{ x = "5" }}`
* Данный пример демонстрирует *объявление переменной*. Переменные могут быть объявлены в любом месте шаблона, и при выводе данная строка будет заменена на *пустую*.
* Значение, присвоенное переменной, выводится следующим образом:

```js
{{ x = "5"
x }}
```

* В результате выполнения команды в шаблоне выведется "5".
* В Scriban переменные бывают двух типов — числовые и строковые. Для каждого типа есть набор поддерживаемых операций:
    + для числовых:
        - \+ `{{ y = x + 1 }}` — сложение;
        - – `{{ y = x – 1 }}` — вычитание;
        - \* `{{ y = x * 2}}` — умножение;
        - / `{{ y = x / 2}}` — деление;
        - // `{{ y = x // 2}}` — деление с округлением до целого;
        - % `{{ y = x % 2}}` — остаток от деления (на 2 в данном случае);
    + для строковых:
        - \+ `{{ name = ('foo' + 'bar') }}` — сложение строк.
* С переменными можно производить операции сравнения с помощью специальных операторов:

| Оператор	| Описание |
|:---------:|----------|
| `==`	| левый операнд __равен__ правому |
| `!=`	| левый операнд __не равен__ правому |
| `>`	| левый операнд __больше__ правого |
| `>=`	| левый операнд __больше или равен__ правому |
| `<`	| левый операнд __меньше__ правого |
| `<=`	| левый операнд __меньше или равен__ правому |
| `!x`	| логическое отрицание от "x" |
| `&&`	| логическое __И__ |
| `\|\|`	| логическое __ИЛИ__ |

* В Scriban есть зарезервированные имена, использовать которые для объявления переменных не рекомендуется. Одним из таких имен является __empty__ (empty представляет собой пустой объект и является аналогом null в других языках программирования).

## Условные операторы и циклы
* В Scriban есть поддержка циклов и условных операторов.
* *Условные операторы* позволяют осуществлять вывод данных в зависимости от какого-либо условия.
```js
{{ if !page }}Page is not null{{ else }}Page is null!{{ end }}
```
* В результате выполнения этого условия выведется "Page is null", если в переменной ничего нет, и "Page is not null", если переменная содержит какую-либо информацию.
* *Циклы* в Scriban строятся на основе условных операторов и, помимо прочего, позволяют работать с коллекциями (наборами однотипных данных). Различают несколько видов циклов:
1. `{{for ‹variable› in ‹expression›}}` , где `‹variable›` — это переменная, а `‹expression›` — массив данных.<br/>
Пример:
```js
{{ for page in pages }}This is the page {{ page.title }}{{ end }}
```
В данном случае выполняется проход по коллекции с выводом названия страниц. Для этого при объявлении цикла была объявлена переменная page, которая представляет собой один из элементов коллекции (массива) pages. В эту переменную будет осуществляться запись текущего элемента на каждом шаге цикла.

1. `{{ for x in 1..n }}This is the loop step [{{x}}]{{ end }}`
<br/>В данном примере коллекция создается прямо при объявлении цикла ("1..n"). На каждом шаге "x" будет заменен на соответствующее ему число. Например, на шаге 2 выведется:
```
This is the loop step [2]
```

1. `{{while ‹expression›}} ... {{end}}`, где `‹expression›` — логическое условие, как в условном операторе. Данный цикл похож на условный оператор и будет выполняться, пока выражение внутри истинно. Например:
```js
{{ flag = 0
    while flag == 0 
    if while.index == 3 
        flag = while.index 
    end }} 
    [{{while.index}}] step 
{{end}}
```
Здесь показано использование цикла while. В результате выполнения будет выведено следующее:
```js
[1] step 
[2] step 
[3] step
```
Также в данном примере используется специальная переменная while.index, равная порядковому номеру текущей итерации (шаг цикла). Цикл будет прерван после третьего шага, когда условие станет ложным.

* Все циклы поддерживают операторы __break__ (прерывание цикла) и __continue__ (переход к следующему шагу). Например:
```js
{{ for i in 1..5
    if i == 2
        break
    end
}}
[{{i}}]] step
{{ end }}
```
```js
{{ for i in 1..5
    if i > 1 && i < 3
        continue
    end
}}
[{{i}}]] step
{{ end }}
```
* В результате будет выведено:
```js
[1] step
```
```js
[1] step
[3] step 
[4] step 
[5] step
```
* В цикле __for__ также есть переменная, в которой находится порядковый номер текущей итерации (for.index). Она используется аналогично while.index в примере выше.
* Отдельно стоит обратить внимание на использование логического И в примере с continue: условие (i > 1 && i < 3) будет аналогично i == 2.

## Встроенные функции
* В Scriban есть встроенные библиотечные функции, которые могут быть полезны при создании шаблонов.
* Например, встроенный объект __date.now__ содержит в себе информацию о текущей дате. Его можно использовать следующим образом:
```js
{{ date.now.‹field› }},
```
* где вместо ‹field› можно подставить любое значение из таблицы, приведенной ниже.

| Имя	| Описание |
|:-----:|----------|
| year	| текущий год |
| month	| текущий месяц |
| day	| день месяца |
| day_of_year	| порядковый номер текущего дня в году |
| hour	| текущий час |
| minute	| текущая минута |
| second	| текущая секунда |
| millisecond	| текущая миллисекунда |

* Таким образом `{{ date.now.year }}` заменится в шаблоне на "2019".
* Ознакомиться с полной оригинальной документацией можно по [ссылке](https://github.com/lunet-io/scriban).

## Scriban в Pixlpark
* В Pixlpark можно использовать Scriban для формирования коммерческих предложений и квитанций заказа. Для этого необходимо выбрать "Создать новый HTML Scriban шаблон". В этом случае будет доступен новый набор подсказок и новый синтаксис для построения шаблонов.
![](../_media/dev/dev11.png ':size=37%')
* Для коммерческого предложения в Pixlpark используется специальный объект "КП", доступные свойства которого можно увидеть в "Подсказке по параметрам". Ниже для примера представлена его структура в нотации JSON.

```json
{
    "sales_tax_formatted": "   53,85 руб.", 
    "cart_price_formatted": "   353,00 руб.", 
    "total_price_formatted": "   406,85 руб.", 
    "photolab": { 
        "id": 2512, 
        "title": "Pixlpark Бизнес-сувениры", 
        "address": "", 
        "email": "info@pixlpark.ru", 
        "phone": "+7 (495) 545-46-91" 
    }, 
    "user": { 
        "id": 0, 
        "display_name": "Иван Иванов", 
        "first_name": "Иван", 
        "last_name": "Иванов", 
        "email": "ivan@pixlpark.com", 
        "phone": "" 
    }, 
    "items": [ 
        {
            "id": 3662352, 
            "size": "5-6 лет", 
            "weight": 0.0, 
            "brand": "Fruit of the Loom", 
            "material": "хлопок 100%, плотность 135 г/м2", 
            "vendor_code": "610190.30/116", 
            "description": "Футболка детская Kids Original T",
            "quantity": 1.0, 
            "title": "Футболка детская \"Kids Original T\", белый", 
            "price": 190.0,
            "price_string": "   190,00 руб.", 
            "cover": "https://example.com/cover1", 
            "sku_values": "", 
            "pos_id": "", 
            "custom_field": "Без нанесения", 
            "item_parts_quantity": 0, 
            "position": 1 
        },                 
        { 
            "id": 3662353, 
            "size": "S–XXL",
            "weight": 0.0,
            "brand": "",
            "material": "хлопок 100%, плотность 120 г/м²; джерси",
            "vendor_code": "7192.60",
            "description": "Качественная футболка для массовых промоакций", 
            "quantity": 1.0, 
            "title": "Футболка \"Промохит\", белая", 
            "price": 163.0, 
            "price_string": "   163,00 руб.", 
            "cover": "https://example.com/cover2",
            "sku_values": "",
            "pos_id": "", 
            "custom_field": "Без нанесения", 
            "item_parts_quantity": 0, 
            "position": 2 
        } 
    ],
    "general_title": "Коммерческое предложение" 
} 
```

* Пример использования Scriban в разметке коммерческого предложения:

```json
{{ for item in items }} 
    ‹div class="prod-container"›                
        ‹p class="h1">{{item.title}}‹/p›                
        ‹div class="left-box"›                 
                ‹img src="{{item.cover}}"›                 
        ‹/div›                 
        ‹p›                 
                {{item.description}}                 
        ‹/p›
        ‹ul› 
                ‹li›Размер — {{item.size}}‹/li› 
                ‹li›Материал — {{item.material}}‹/li› 
                ‹li›Вес — {{item.weight}}‹/li› 
                ‹li›Артикул — {{item.vendor_code}}‹/li›
        ‹/ul› 
        ‹p› 
            Стоимость тиража {{item.quantity}} (с НДС) = {{item.price}} руб. 
        ‹/p› 
    ‹/div› 
{{ end }}
```

* Как и в примерах выше, все свойства вызываются через "__.__" (например, `{{item.price}}`), а для вывода элементов коллекции необходимо использовать цикл (`{{ for item in items }} ... {{ end }}`).
* Отдельно стоит сказать про поле __position__: оно показывает порядковый номер элемента в переданной коллекции. При использовании циклов не рекомендуется использовать position для вывода порядкового номера элемента. Лучше заменить его специальными переменными цикла: while.index, for.index и прочими, описанными в официальной документации. При использовании более сложных алгоритмов вывода элементов (как в примере с continue и break) рекомендуется создать отдельную переменную для сохранения номера позиции внутри нее.