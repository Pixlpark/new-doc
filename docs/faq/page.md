# Страница раздела
## Описание
* В данном разделе можно сконфигурировать страницу списка [категорий и статей](https://demo.pixlpark.ru/faq), доступной по адресу "__/faq__".  
* Для простоты понимания можно представить, что страница списка категорий и статей - это обычная страница сайта, обладающая теми же самыми свойствами.
![](../_media/faq/faq.png ':size=80%')

## Основная информация
* __Заголовок__ - заголовок, который используется в качестве `H1`, если его нет в содержимом страницы.
* __Название в хлебных крошках__ - название страницы в навигационной цепочке, которая выводится через константу `[$breadcrumbs$]`. Если название не задано, то используется заголовок.
* __Адрес в интернете__ - адрес страницы на сайте.
* __Отображать страницу в sitemap.xml__ - включить страницу в файл sitemap.xml, который используется для информирования поисковых систем о наличии на сайте данной страницы.
![](../_media/faq/page-general.png)

## Содержимое страницы
* В данной разделе задается содержимое секций, из которых формируется страница сайта. По умолчанию содержимое задается в виде HTML-разметки, которая также может содержать стили и скрипты. Список категорий и статей автоматически встраивается в самый низ секции "__Основной контент__".
![](../_media/feedback/page-content.png)