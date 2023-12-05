# Регламент работы технической поддержки
## Общая информация

* Техническая поддержка Pixlpark работает согласно [производственному календарю](https://www.consultant.ru/law/ref/calendar/proizvodstvennye/) с 6.00 до 17.00 по московскому времени.
* Обратиться к ней можно:
    + Позвонив по телефону +7 (495) 545-46-91.
    + Оставив заявку на [портале технической поддержки](http://support.pixlpark.ru/) (предварительно пройдя процедуру регистрации). 
    + Написав в онлайн-чат через панель управления (правый верхний угол / значок колокольчик - онлайн-помощь).
* Перед обращением вы можете самостоятельно попытаться найти ответ на интересующий вас вопрос:
    + В [документации по платформе](https://docs.pixlpark.ru/).
    + В [наших новостях](https://pixlpark.ru/news).
* Мы рекомендуем простые вопросы по платформе задавать в режиме онлайн-чата, а сообщения об ошибках, задачи на разработку нового функционала или настройку сайта формулировать в виде заявок на портале поддержки.
* Максимальное время ответа на заявки составляет 3 рабочих дня, однако в сезон этот срок может увеличиваться до 5 дней. Однако срочные заявки рассматриваются с максимальным приоритетом в течении 1-2 часов.
* Срочными заявками считаются те, в которых сообщается о проблемах, препятствующих исполнению или оформлению заказа более чем у 1% посетителей сайта.
* Также с повышенным приоритетом рассматриваются заявки компаний, работающих на [тарифах](https://pixlpark.ru/plans) "Комфорт" и "Премиум".

## Создание HAR-файла

* Для решения сложных технических проблем команде техподдержки Pixlpark часто требуется информация о взаимодействии интернет-магазина с браузером.
* Чтобы исследовать проблему, техподдержка может попросить HAR-файл (это HTTP архив) или лог сетевых запросов. С помощью таких файлов специалисты техподдержки проверяют сетевые запросы вашего браузера в момент возникновения проблемы. Ниже вы найдете инструкции по созданию HAR-файла в разных браузерах.
> Если ниже отсутствует инструкция для вашего браузера, необходимо найти информацию в Интернете по запросу "__Как создать HAR-файл для [название браузера]__".
* Инструкции для браузеров
    + [Google Chrome](#google-chrome)
    + [Mozilla Firefox](#mozilla-firefox)
    + [Microsoft Edge и Internet Explorer 11](#microsoft-edge-и-internet-explorer-11)

### Google Chrome

* Как создать HAR-файл в Google Chrome:
    1. Открыть страницу магазина, на которой возникает проблема.
    2. В меню в правом верхнем углу выбрать пункты "__Дополнительные инструменты / Инструменты разработчика__".
    ![](../_media/misc/har_chrome-01.png ':size=70%')
    3. В открывшемся окне перейти на вкладку "__Сеть (Network)__".
    ![](../_media/misc/har_chrome-02.png ':size=70%')
    4. Кнопка записи в левом верхнем углу должна быть красной. В случае, если кнопка серого цвета, необходимо нажать на нее для начала записи.
    ![](../_media/misc/har_chrome-03.png ':size=70%')
    5. Включить опцию сохранения логов "__Preserve log__".
    ![](../_media/misc/har_chrome-04.png ':size=70%')
    6. Нажать кнопку удаления данных для удаления предыдущих лог-записей с вкладки "__Network__".
    ![](../_media/misc/har_chrome-05.png ':size=70%')
    7. Пока идет запись сетевых запросов необходимо воспроизвести проблему.
    8. После воспроизведения проблемы нажать правой кнопкой мыши в любом месте таблицы сетевых запросов, выбрать "__Save as HAR with Content__" и сохранить файл на компьютере.
    ![](../_media/misc/har_chrome-06.png ':size=70%')
    9. Написать в техподдержку Pixlpark и прикрепить HAR-файл к письму. В теме письма необходимо написать "__Сетевая проблема, HAR-файл во вложении__".


### Mozilla Firefox

* Как создать HAR-файл в Mozilla Firefox:
    1. Открыть страницу магазина, на которой возникает проблема.
    2. В меню Firefox в правом верхнем углу окна браузера выбрать "__Другие инструменты / Инструменты веб-разработчика__".
    ![](../_media/misc/har_mozilla-01.png ':size=70%')

    ![](../_media/misc/har_mozilla-02.png ':size=70%')
    3. В нижней или боковой части страницы откроется панель инструментов на вкладке "__Сеть__" и начнется запись сетевых запросов.
    ![](../_media/misc/har_mozilla-03.png ':size=70%')
    4. Воспроизвести проблему, через несколько секунд она будет записана. Далее, нажать правой кнопкой мыши в любом месте списка сетевых запросов и в меню выбрать "__Сохранить все как HAR__".
    ![](../_media/misc/har_mozilla-04.png ':size=70%')
    5. Сохранить созданный HAR-файл на компьютере.
    6. Написать в техподдержку Pixlpark и прикрепить HAR-файл к письму. В теме письма необходимо написать "__Сетевая проблема, HAR-файл во вложении__".

### Microsoft Edge и Internet Explorer 11

* Как создать HAR-файл в Microsoft Edge и Internet Explorer 11:
    1. Открыть страницу магазина, на которой возникает проблема.
    2. На клавиатуре нажать "__F12__" для открытия панели инструментов разработчика.
    ![](../_media/misc/har_ie-01.png ':size=70%')
    3. Перейти на вкладку "__Сеть__".
    ![](../_media/misc/har_ie-02.png ':size=70%')
    4. Обновить страницу и воспроизвести проблему. Сетевые запросы будут записаны.
    5. После завершения записи нажать кнопку "__Экспортировать как HAR-файл__" или нажать "__Ctrl + S__" на клавиатуре.
    ![](../_media/misc/har_ie-03.png ':size=70%')
    6. Сохранить созданный HAR-файл на компьютере.
    7. Написать в техподдержку Pixlpark и прикрепить HAR-файл к письму. В теме письма необходимо написать "__Сетевая проблема, HAR-файл во вложении__".