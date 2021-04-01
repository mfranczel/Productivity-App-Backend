# Productivity-App-Backend

Github link: https://github.com/mfranczel/Productivity-App-Backend

## Spustenie

Docker:

```console
foo@bar:~$ docker-compose build
foo@bar:~$ docker-compose up
```

## Zmeny

### Backendové testy

- Pri teste 2 (Zmena používateľských údajov) mením email namiesto hesla kvôli tomu, že sa nedá zo servera retrievnúť. Je zmenený na mail bez @, čo by taktiež malo zamietnuť.
- Pri teste 6 Server odpoveda bad 500 namiesto 400 pri pohladavke a vytvorenie noveho tasku bez titlu.

### API

- Niektoré zmenené a pridané nové response kódy, zväčša len 500 v prípade chyby na strane servera
- Pri /habit/get zmenený response body, pred tým bol zjednodušený, teraz napísaný v celej svojej kráse - array objektov, z ktorých každý má dve ďalšie arraye objektov
- Pri /habit/get bol odstránený path parameter s používateľským ID - získavame ho vždy z tokenu
- Pridané summary pri requestoch kvôli prehľadnosti
- Pri stats vraciame array integerov namiesto objekty (len ciselne udaje)

### Databázový model
- Pri databázovom diagrame pridané created_at, modified_at (sequelize), typ pri habit zmenený na enum v sequelize (v diagrame string)
- Typ pri task zmenený na enum v sequelize (v diagrame string)
- Zrusenie todo_item table a zlucenie informacie z nej do todo_list (bola redundantna informacie z nej boli duplicitne napriklad created_at aj modified_at)
- TaskState obsahuje len state


## Dátový model
![Model](./diag1.2.svg)

## Dokumentacia
https://documenter.getpostman.com/view/10555291/TzCP77Dq
