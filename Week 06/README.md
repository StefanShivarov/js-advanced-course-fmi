# Упражнение 6

## 13.11.24

1.  Създайте итератор, който изполва стуктурата `alphabet-tree` и изписва английската азбука .

    ```javascript
    for (const letter of alphabetTree) {
      console.log(letter); // Outputs A, B, C, ... Z
    }
    ```

1. Напишете първата задача от миналато упражнение, използвайки stream-ове *(Readable stream + Transform stream)*

    Създайте прост http сървър, който да поддържа заявката GET `fetchTemplate/<template_name>`. Идеята на тази заявка е да достъпи темплейт, намиращ се в папка `templates` на сървъра.
    Темплейтите са txt файлове, в които ще има и стрингове за интерполация:
        ```html
        <h1>Name</h1>
        <h2>{{name}}</h2>
        ```
        В горната заявка посредством query параметри, ще се подават и данните, които трябва да се заместят на съответните места в темплейта.

        Пример:

        Да допуснем, че се извиква следната заявка: `fetchTemplate/home?name=John`, като `templates/home.txt` е гореописаният темплейт.
        Очакваният резултат е:
        ```html
        <h1>Name</h1>
        <h2>John</h2>
        ```