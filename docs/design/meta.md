---
title: Выпускные альбомы
description: Спецификация подготовки макетов выпускных альбомов
sidebar_position: 3
---

# Выпускные альбомы
## Подготовка макетов
* Макет для выпускных альбом следует создавать согласно структуре, которая описана в статье ["Особенности макетов фотокниг"](/design/psd).
* Для автоматической верстки выпускных альбомов макет шаблона должен содержать в себе метаинформацию, по которой в дизайн будут подставляться реальный данные класса.
* Метаинформация в данном случае является набором ключей, которые необходимо использовать в названиях слоев или групп.
* **`[meta:school]`** - группа, содержащая информацию о школе. В ней можно использовать слои со следующими ключами:
    + `[meta:name]` - наименование учебного заведения;
    + `[meta:letter]` - наименование учебного заведения без номера;
    + `[meta:number]` - номер учебного заведения;
    + `[meta:city]` - название города;
    + `[meta:photo]` - фотография учебного заведения.
* **`[meta:class]`**  - группа, содержащая информация о классе. В ней можно использовать слои со следующими ключами:
    + `[meta:number]` - номер класса (или название группы);
    + `[meta:letter]` - буква класса;
    + `[meta:number letter]` - буква и номер класса слитно;
    + `[meta:year]` - год выпуска;
    + `[meta:year half1]` - первые две цифры года выпуска;
    + `[meta:year half2]` - вторые две цифры года выпуска;
    + `[meta:profile]` - профиль класса (например "физико-математический");
    + `[meta:photo]` - общая фотография класса.
    + `[meta:qr]` - куар-код для скачивания программы по оживлению.
* **`[meta:class years]`**  - группа, содержащая информацию о годе выпуска в виде растровых изображений. В ней можно использовать слои со следующими ключами:
    + `[meta:year]` - год выпуска, где year - год;
    + `[meta:year half1]` - первые две цифры года выпуска, где year - год;
    + `[meta:year half2]` - вторые две цифры года выпуска, где year - год;
* **`[meta:teacher] / [meta:curator] / [meta:director]`** - группа, содержащая информация об учителе/классном руководителе/директоре. В ней можно использовать слои со следующими ключами:
    + `[meta:firstname]` - имя учителя;
    + `[meta:lastname]` - фамилия учителя;
    + `[meta:middlename]` - отчество учителя;
    + `[meta:firstname middlename]` - имя и отчество учителя;
    + `[meta:note]` - примечание от учителя;
    + `[meta:post]` - должность учителя;
    + `[meta:frame]` - фотография на виньетку;
    + `[meta:sign]` - фотография подписи;
* **`[meta:student]`** - группа, содержащая информация об ученике. В ней можно использовать слои со следующими ключами:
    + `[meta:firstname]` - имя ученика;
    + `[meta:lastname]` - фамилия ученика;
    + `[meta:middlename]` - отчество ученика;
    + `[meta:firstname lastname]` - имя и фамилия ученика;
    + `[meta:note]` - примечание от ученика;
    + `[meta:personal]` - персональное фото;
    + `[meta:cover]` - фотография на обложку;
    + `[meta:cover without-bg bg-color:#FFFFFF]` - фотография на обложку, у которой автоматически вырезается фон, а затем он заменяется на указанный цвет;
    + `[meta:frame without-bg bg-color:#FFFFFF]` - фотография на виньетку, у которой автоматически вырезается фон, а затем он заменяется на указанный цвет;
    + `[meta:frame]` - фотография на виньетку;
    + `[meta:sign content-color:#FFFFFF]` - фотография подписи, где фон вырезается, а содержимое приводится к указаному цвету;
* **`[meta:classmates]`** - группа, содержащая информация об учениках, т.е. все группы `[meta:student]` должны быть расположены именно в ней. Но, ученик, для которого создается альбом должен размещаться вне этой группы.
* **`[meta:students:n]`** - группа, содержащая слои дизайна разворота с виньетками учеников, где __n__ - количество учеников.
* **`[meta:teachers:n]`** - группа, содержащая слои дизайна разворота с виньетками учителей, где __n__ - количество учителей.
* **`[meta:my-friends]`** - группа, содержащая фотографии с друзьями.
* **`[meta:class photo]`** - общее фото класса.
* **`[meta:page]`** - номер страницы альбома.
* **`[nozoom]`** - параметр для автоматической отмены увеличения фотографии в виньетке.
* **`[metamark:align:center]`** - параметр для выравнивания текста по центру своего блока.

## Подготовка шаблонов
### Выпускной альбом для старших классов
* Шаблон должен содержать следующие макеты ([пример макета](https://demo.pixlpark.ru/content/docs/templates/starshie_klassi.rar?v=6A11C79826592109C7A5C800E9F96350) / [пример в редакторе](https://demo.pixlpark.ru/printing/graduation-photobooks-template/21x30/template-6884650/editor)):
    + **Четыре обложки**: без фото, с фото в рамке, с фото на всю страницу, с фото без фона;
    + **Персональный разворот**: большое фото, среднее фото и пожелание ученика;
    + **Виньетки с учениками**: фото классного руководителя, его пожелание и фото учеников (20-30 человек);
    + **Виньетки с учителями**: большое фото классного руководителя, его пожелание и фото учителей (10-21 человек);
    + **Четыре разворота с учениками**: от 1 до 4 фото с пожеланиями на странице;
    + **Три разворота с друзьями**: от 4 до 7 рамок под фото;
    + **Три разворота под коллажи**: фон и элементы декора по краям;
    + **Разворот с общим фото**: большое групповое фото.
### Выпускной альбом для младших классов
* Шаблон должен содержать следующие макеты ([пример макета](https://demo.pixlpark.ru/content/docs/templates/mladshie_klassi.rar?v=8B43A9BD16F9F436898A6ADF0A963476) / [пример в редакторе](https://demo.pixlpark.ru/printing/graduation-photobooks-template/21x30/template-6813784/editor)):
    + **Четыре обложки**: без фото, с фото в рамке, с фото на всю страницу, с фото без фона;
    + **Персональный разворот**: большое фото, среднее фото и пожелание ученика;
    + **Виньетки с учениками**: фото классного руководителя, его пожелание и фото учеников (20-30 человек);
    + **Четыре разворота с учениками**: от 1 до 4 фото с пожеланиями на странице;
    + **Три разворота с друзьями**: от 4 до 7 рамок под фото;
    + **Три разворота под коллажи**: фон и элементы декора по краям;
    + **Разворот с общим фото**: большое групповое фото.
### Выпускной альбом для детского сада
* Шаблон должен содержать следующие макеты ([пример макета](https://demo.pixlpark.ru/content/docs/templates/detskyi_sad.rar?v=D984BE3405E6A2DEDC3195220067DE05) / [пример в редакторе](https://demo.pixlpark.ru/printing/graduation-photobooks-template/21x30/template-6884651/editor)):
    + **Четыре обложки**: без фото, с фото в рамке, с фото на всю страницу, с фото без фона;
    + **Персональный разворот**: большое фото, среднее фото и пожелание ребенка;
    + **Виньетки с детьми**: три фото воспитателей и фото детей (15-30 человек);
    + **Два разворота с друзьями**: от 4 до 7 рамок под фото;
    + **Два разворота под коллажи**: фон и элементы декора по краям;
    + **Разворот с общим фото**: большое групповое фото.