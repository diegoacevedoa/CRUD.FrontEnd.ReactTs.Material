CRUD Front End en ReactJs y Material UI.

PASOS PARA DESARROLLARLO

1- Crear proyecto con Vite: npm create vite@latest project-name, seleccionamos reactjs y javascript.

2- Nos ubicamos en la carpeta del proyecto: cd project-name

3- Instalamos librerías de nodejs: npm install

4- Ejecutamos proyecto para ver que todo funcione OK: npm run dev

5- Instalamos estilos material: npm install @mui/material @emotion/react @emotion/styled 

6- Instalamos componentes estilados de material: npm install @mui/material @mui/styled-engine-sc styled-components

7- Instalamos íconos de material: npm install @mui/icons-material

8- Instalamos fuentes de material: npm install @fontsource/roboto

6- Eliminamos los archivos index.css, app.css, react.svg y los linkeos a esos archivos.

7- Limpiamos componente App y verificamos funcionamiento OK con npm run dev

8- Instalar Sass para estilos, es mejor que css, es scss: npm install sass

9- Instalamos sweetalert2 para los mensajes: npm i sweetalert2

9-Creamos carpetas: api, components, helpers y hooks en carpeta src.

10-Creamos carpetas: modules y ui en carpeta components.

11-Incluimos componentes en la carpeta ui: button, field, icons, label, loading, modal y table.

12-Incluimos el hook useForm en la carpeta hooks para capturar datos de entrada y sus validaciones.

13-Incluimos el archivo fetch.ts en la carpeta helpers para llamar el api del backend.

14-Creamos la carpeta persona en modules y creamos los componentes en esta con rafc: Persona.tsx, PersonaList.tsx, PersonaForm.tsx y el archivo index.ts para exportar el componente principal Persona.tsx, e invocamos el componente Persona.tsx desde el componente App.tsx.

15-Creamos el archivo constants.ts en la carpeta helpers con las rutas del api del backend

16- Creamos el archivo helpers.ts en la carpeta helpers

17-Creamos la carpeta persona en api y creamos el archivo persona.ts para los métodos de llamado del api del back end.

18-Creamos el archivo map.ts en la careta api/persona para mapear las columnas de las grids y el archivo index.ts para exportar los métodos de la carpeta api/persona

19-Creamos el archivo interfaces.ts en la careta api/persona para crear las iterfaces.

20-Crear variables de entorno en src .env.development y .env.production: VITE_APP_API_URL=http://localhost:3000/api

21-Modificar componente PersonaList.tsx

22-Modificar componente PersonaForm.tsx

23-Modificar componente Persona.tsx