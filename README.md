# Test meli
 Juan Sebastián González Rivera

## Descripción
- El siguiente proyecto contiene dos carpetas, client (Front) y server (Back), cada una de ellas tiene sus propias dependencias, se deberá instalar los paquetes antes de probar 

```bash
    cd server && yarn install && yarn start
    cd client && yarn install && yarn start
```


## Specs
- Node v14.7.0
- Typescript v3.7.2

## Notas 

- En la respuesta del server se agrega el campo location por item, esto para renderizar la locación en el listado de productos
- Para algunas busquedas no exísten categorias en filtros por lo que no se renderiza el breadcrumb y el atributo *avalible_filters* no tiene una relación jerarquica de las categorías para poder basarme 
- Cuando existe una categoria en filtros suele venir solo un objeto dentro del arreglo **filters[id=category].values**, es decir siempre devuelvo el primer objeto del arreglo. No encontré alguna busqueda que resolviera más de un valor en este arreglo. Un ejemplo sería un sustantivo con más de un significado: gato, pues se podría decir que se habla del animal o de la herramienta por lo que supuse vendría más de categoria sin embargo el resultado es el siguiente:

    - https://api.mercadolibre.com/sites/MLA/search?q=gato

```javascript
"filters": [
        {
            "id": "category",
            "name": "Categorías",
            "type": "text",
            "values": [
                {
                    "id": "MLA1082",
                    "name": "Gatos",
                    "path_from_root": [
                        {
                            "id": "MLA1071",
                            "name": "Animales y Mascotas"
                        },
                        {
                            "id": "MLA1081",
                            "name": "Gatos"
                        },
                        {
                            "id": "MLA1082",
                            "name": "Gatos"
                        }
                    ]
                }
            ]
        }
    ]
```