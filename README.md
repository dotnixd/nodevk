# nodevk

Бот для ВКонтакте, написан на Node.JS

### Установка зависимостей
```shell
$ npm install
```

### Конфигурация
Создайте файл `config.ini` с содержимым:
```ini
prefix = "<префикс, который будет использовать бот>"
moddir = "./plugins"

[bot]
token = "<токен>"

admins[] = <ваш айди>
```

## Запуск
```shell
$ node main
```
