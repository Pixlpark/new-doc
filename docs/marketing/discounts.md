---
title: Скидки
description: Управление персональными, купонными и общими скидками
sidebar_position: 1
---

# Скидочная система
## Типы скидок
* __Скидка__ - это один из самых эффективных инструментов маркетинга, который выражается в понижении стоимости текущего или будущего заказа клиента.
* Основными характеристиками скидки, определяющими ее поведение являются:
    + __Тип скидки__:
        + __Персональная__ - скидка доступна либо определенному набору клиентов, либо указанной группе клиентов;
        + __Купонная__ - скидка становится доступна только после активации ее купонов;
        + __Общая__ - скидка по умолчанию доступна всем клиентам.
    + __Применимость__:
        + Скидка применяется к текущему заказу;
        + Скидка зачисляется в виде бонусных баллов для оплаты следующих заказов;
    + __Суммируемость__:
        + Скидка суммирует свое значение с другими скидками, допускающими суммирование;
        + Скидка не суммируется свое значение с другими.
* Именно комбинация этих параметров определяет всю вариативность применения скидок, которые мы рассмотрим ниже в разделе “Примеры использования”.
* Все скидки имеют как общие, так и специфичные характеристики:
    + Для персональных скидок это либо ручное добавление клиента, либо связывание с группой клиентов;
    + Для купонных скидок это возможность ручного ввода купонов, либо их автоматическая генерация.

## Настройка скидки
* Рассмотрим общие характеристики скидки, которые расположены во вкладке “__Настройка__”:
    + __Название на сайте__ - название скидки, отображаемое на сайте в личном кабинете пользователя и на странице корзины.
    + __Название в панели управления__ - название скидки, отображаемое в панели управления на странице заказа, списка скидок, профиля клиента и выгрузках.
    + __Количество применений__ - количество возможных применений скидки:
        + Неограниченно;
        + Одноразово;
        + N раз (с заданием количества);
        + Один раз на клиента;
        + N раз на клиента (с заданием количества);
        + Только на первый заказ;
        + Один раз на купон;
        + Заданное количество раз на купон.
    + __Период действия__ - диапазон времени, в течении которого скидка доступна для использования. 
    + __Скидка доступна на сайте__ - доступность скидки для использования.
    + __Использовать в качестве бонусов__ - зачислять значение скидки на счет в виде бонусных баллов.
    + __Суммировать скидку с другими__ - суммировать скидку с другими суммирующимися (у которых включена аналогичная настройка).
    + __Отправлять уведомления для скидки__ - оставлять логику работы уведомлений (о добавлении клиента в персональную скижку или активации купона) без изменений. Выключая данную настройку соответствующие уведомления для данной скидки отправляться не будут, даже если они включены.
    + __Величина скидки на продукты__ - фиксированное или процентное значение в рамках определенных диапазонов тиражности с максимальным значением как на один продукт, так и на заказ в целом;
    + __Величина скидки на доставку__ - фиксированное или процентное значение в рамках определенных диапазонов тиражности;
    + __Ограничения__ - ограничение применимости скидки по различным характеристиками:
        + По категориям раздела "Печать";
        + По опциям раздела "Печать";
        + По категориям раздела "Сувениры";
        + По категориям раздела "Магазин";
        + По способам доставки;
        + По способам оплаты;
        + По источнику заказа (все, сайт, приложение);
        + По сумме скидочных товаров или всего заказа;
        + По количеству продуктов, к которым применятся скидка;
        + По дням недели, праздникам или периоду в течении дня;


## Множественное применение
* Очень часто случается так, что пользователю в определенный момент времени для продуктов корзины доступно сразу несколько скидок. В этом случае система применяет лишь те, которые суммарно дают максимальную выгоду.
* Логика одновременного применения скидок настраивается в панели управления в разделе “Маркетинг / Скидки / Настройка”. По умолчанию применяются все суммирующиеся скидки и одна из оставшихся, дающая максимальную выгоду. 
* Далее, через соответствующие настройки этот алгоритм можно видоизменять:
    + Отключить добавление максимальной скидки, чтобы учитывались только суммирующиеся;
    + Отключить добавление суммирующихся скидок - в этом случае будет применена одна скидка, дающая максимальную выгоду среди всех возможных (включая суммирующихся);
    + Среди суммирующихся купонных скидок применять к продукту лишь одну, дающую максимальную выгоду;
* В случае, если применяется скидка в виде начисления бонусов, то пересчитывать их величину после оформления заказа от суммы фактической оплаты, т.е. за вычетом оплата бонусными баллами.