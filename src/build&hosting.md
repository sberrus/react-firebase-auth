# DEPLOY EN HOSTING DE FIREBASE.

Firebase nos proporciona multiples herramientas para desarrollar software de calidad de una manera bastante comoda. Una de las incorporaciones que vamos a probar es el hosting.

#Pasos para hacer deploy en hosting firebase

-   (Solo una vez por ordenador) instalar paquete de manejo de deploy de firebase "npm install -g firebase-tools".

-   En la consola dentro de la ruta del proyecto introducir "firebase login" y hacer login web. (el proceso se inicia automaticamente al introduci el comando en consola).

-   En la consola dentro de la ruta del proyecto introducir "firebase init"

    -   Pregunta primero si deseamos proceder con la creación del proyecto.
    -   Desplegará una lista de opciones preguntando que modulos deseamos incorporar al proyecto. En este caso usaremos Firestore y Hosting.
    -   Despues pregunta si queremos usar un proyecto existente o crear uno nuevo. (Como ya hemos creado el proyecto para este ejemplo usaremos uno existente).
    -   Luego desplegara una lista de proyectos y deberemos indicar en cual de ellos debemos alojar la app.
    -   Despues pregunta acerca de las reglas de seguridad (PENDIENTE DE ESTUDIAR). Al no tener ninguna, seguir con el proceso.
    -   Despues pide un index.json de firestore, este tampoco lo hemos creado. Seguiremos con el estándar.
    -   \*\*\* Paso importante: Preguntará por el directorio publico, este es el directorio donde se encuentra el proyecto en neustro equipo. Como ya hemos realizado el "npm run build" tenemos que indicar la ruta para la carpeta "./build" que tiene la app lista para producción.
    -   A continuación, pregunta si es una SPA y le indicaremos que si, REACT renderiza solamente SPA.
    -   (Investigar acerca de las opciones de deploy con Github)

-   Para Finalizar realizamos un deploy con "firebase deploy"

# ASPECTOS IMPORTANTES.

-   Una de las cosas que debemos saber es que el comando "firebase deploy" funciona como el "git push" de github. Cuando hagamos deploy firebase incorporara al hosting todo lo que encuentre en la carpeta "./build" o la ruta que hayamos indicado para los recursos del proyecto. Por lo que cada vez que hagamos deploy se enviará esa carpeta entera al hosting.
