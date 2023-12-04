# ToDo List

Тестовое задание - небольшой To Do List на стеке Flask + React (MobX).


## Запуск приложения

1. Убедитесь, что у вас установлен Docker и Docker Compose.

2. Склонируйте репозиторий:
   ```bash
   git clone https://github.com/zombieserv/flask-todo-list
   cd flask-todo-list
   
3. Скопируйте файл .env и установите значения переменных окружения:
    ```bash
   cp .env.sample .env

4. Запустите Docker Compose
     ```bash
       docker-compose up --build

5. Приложение будет доступно по адресу http://localhost:3000