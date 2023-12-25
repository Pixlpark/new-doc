---
title: Создание заказа
description: Создание заказа в панели управления сотрудником компании
sidebar_position: 4
---

# Создание заказа
## Описание
* Функция создания заказа через панель управления может быть востребована в нескольких случаях:
    + При использовании Pixlpark в качестве CRM-системы, т.е. ведении в ней всей базы клиентов и заказов (как онлайн, так и офлайн).
    + При создании заказа за клиента: либо вместо его ошибочного заказа с сайта, либо по телефонному звонку.
* Отметим, что для оптимизации работы с формой можно для некоторых полей настроить значению по умолчанию, которые  будут в них подставляться. Они задаются в разделе "__Настройка / Управление заказами → Параметры страницы создания заказа по умолчанию__". Дополнительно возможно [создать шаблон заказа](/orders/create-order-template).
* Сама страница создания заказа открывается  при нажатии кнопки "__+__" напротив заголовка "__Заказы__" в панели управления слева. Большая часть полей формы обязательна к заполнению, рассмотрим их более детально.
* ![](../_media/order/order-create.png ':size=80%')

## Заполнение формы
* __Менеджер заказа__ - сотрудник, который будет являться менеджером данного заказа. По умолчанию им является текущий сотрудник, работающий с панелью управления.
* __Клиент__ - частное либо или организация, которое будет являться владельцем заказа. Вы можете либо выбрать существующего клиента, либо зарегистрировать нового.
* __Элементы заказа__ - позиции заказа, которыми могут быть:
    + __Продукты раздела "Печать"__ (при добавлении продукта можно запустить калькулятор для расчета стоимости и редактор для создания дизайна).
    + __Продукты из ERP-системы__ (ASystem / 1С:Полиграфия / HelloPrint / Axiom).
    + __Продукты раздела "Магазин"__.
    + __Произвольные продукты__.
* __Доставка заказа__ - способ доставки заказа, который может быть:
     + Точкой выдачи.
     + Транспортной компанией.
     + Курьерской службой.
* __Оплата заказа__ - статуса оплаты заказа и источника платежа. Если в качестве источника платежа будет выбрана онлайн-система, то у клиента в личном кабинете появится ссылка для оплаты.
* __Тип заказа__ - типа заказа:
    + Обычный заказ.
    + Коммерческое предложение.
* __Дополнительные файлы__ - загрузка дополнительных файлов клиента.
* __Дата готовности__ - задание даты готовности заказа.