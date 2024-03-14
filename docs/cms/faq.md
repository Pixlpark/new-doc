---
title: FAQ
description: Ответы на популярные вопросы по работе с разделом
sidebar_position: 7
---

# Ответы на популярные вопросы

## Как подключить онлайн-чат на сайт
* Для подключения онлайн-чата, виджета обратного звонка или другого подобного сервиса необходимо разместить код данного виджета во __втором поле__ раздела “__CMS / Страницы / Скрипты__”.
* Если же требуется, чтобы виджет отрабатывал не на всех страницах сайта, то тогда необходимо:
    + Перейти в раздел “__CMS / Слои__”;
    + Создать новый слой, указав в нем маску с исключенными страницами;
    + Разместить код виджета в __секции “JavaScript”__.
* Например, на демо-сайте виджет онлайн-чата отображается на всех страницах кроме редактора. В этом случае в слое указывается маска: “__-url(*/editor*)__".
* Подробнее о форматировании маски можно прочитать в соответствующем разделе документации.


## Видеоуроки
### Редактирование страниц сайта
<iframe width="840" height="473" src="https://www.youtube.com/embed/oz3NFaSBWAs?si=yO56YYUXjStnTvnr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Как подключить онлайн-чат на сайт
<iframe width="840" height="473" src="https://www.youtube.com/embed/fwO_SiWLUTA?si=ainvKvJ5NqErVvWk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
