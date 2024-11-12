import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSun, FaMoon } from "react-icons/fa"; // Importamos los iconos de día y noche

function Formulario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      nombre: "",
      correo: "",
      fechaNacimiento: "",
      password: "",
      confirmarPassword: "",
      pais: "co",
      archivo: "",
      aceptaTerminos: false,
    },
  });

  const password = useRef(null);
  password.current = watch("password", "");

  const [darkMode, setDarkMode] = useState(false); // Estado para el modo oscuro

  // Función para alternar entre modo claro y modo oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark'); // Agrega la clase 'dark' al documento
    } else {
      document.documentElement.classList.remove('dark'); // Elimina la clase 'dark' al documento
    }
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-slate-400" : "bg-slate-700"
      } transition-all duration-500`} // Fondo que cambia completamente al modo oscuro/claro
    >
      <div className="max-w-3xl p-6">
        {/* Botón para cambiar entre modo claro y modo oscuro */}
        <button
          onClick={toggleDarkMode}
          className="mb-6 p-2 rounded-md bg-gray-300 dark:bg-gray-700 dark:text-white transition-all transform hover:scale-105 duration-200"
        >
          {darkMode ? (
            <FaSun className="text-yellow-400 text-xl" />
          ) : (
            <FaMoon className="text-blue-500 text-xl" />
          )}
        </button>

        <form
          onSubmit={onSubmit}
          className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-2 border-gray-300 dark:border-gray-700 transition-all"
        >
          {/* Campo para el nombre */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 dark:text-gray-100">Nombre:</label>
            <input
              type="text"
              name="nombre"
              {...register("nombre", {
                required: { value: true, message: "Nombre es requerido" },
                maxLength: 20,
                minLength: 2,
              })}
              className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
            {errors.nombre?.type === "required" && <span className="text-red-500">Nombre requerido</span>}
            {errors.nombre?.type === "maxLength" && (
              <span className="text-red-500">Nombre no debe ser mayor a 20 caracteres</span>
            )}
            {errors.nombre?.type === "minLength" && (
              <span className="text-red-500">Nombre debe ser mayor a 2 caracteres</span>
            )}
          </div>

          {/* Campo para el correo electrónico */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 dark:text-gray-100">Correo Electrónico:</label>
            <input
              type="email"
              name="correo"
              {...register("correo", {
                required: { value: true, message: "Correo es requerido" },
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Correo no válido",
                },
              })}
              className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
            {errors.correo && <span className="text-red-500">{errors.correo.message}</span>}
          </div>

          {/* Campo para la fecha de nacimiento */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 dark:text-gray-100">Fecha de Nacimiento:</label>
            <input
              type="date"
              name="fechaNacimiento"
              {...register("fechaNacimiento", {
                required: { value: true, message: "Fecha de nacimiento es requerida" },
                validate: (value) => {
                  const fechaNacimiento = new Date(value);
                  const fechaActual = new Date();
                  const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
                  return edad >= 18 || "Debes ser mayor de edad";
                },
              })}
              className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
            {errors.fechaNacimiento && <span className="text-red-500">{errors.fechaNacimiento.message}</span>}
          </div>

          {/* Campo para la contraseña */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 dark:text-gray-100">Contraseña:</label>
            <input
              type="password"
              name="password"
              {...register("password", {
                required: { value: true, message: "Contraseña es requerida" },
                minLength: { value: 6, message: "Contraseña debe ser mayor a 6 caracteres" },
              })}
              className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>

          {/* Campo para confirmar la contraseña */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 dark:text-gray-100">Confirma Contraseña:</label>
            <input
              type="password"
              name="confirmarPassword"
              {...register("confirmarPassword", {
                required: { value: true, message: "Confirmar contraseña es requerida" },
                minLength: { value: 6, message: "Confirmar contraseña debe ser mayor a 6 caracteres" },
                validate: (value) => value === password.current || "Las contraseñas no coinciden",
              })}
              className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
            {errors.confirmarPassword && <span className="text-red-500">{errors.confirmarPassword.message}</span>}
          </div>

          {/* Campo para el país */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 dark:text-gray-100" htmlFor="pais">Pais:</label>
            <select
              name="pais"
              id="pais"
              {...register("pais")}
              className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            >
              <option value="mx">México</option>
              <option value="co">Colombia</option>
              <option value="ar">Argentina</option>
            </select>

            {watch("pais") === "ar" && (
              <input
                type="text"
                placeholder="Provincia"
                {...register("provincia", {
                  required: { value: true, message: "Provincia es requerida" },
                })}
                className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              />
            )}
          </div>

          {/* Campo para cargar un archivo */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 dark:text-gray-100">Subir nombre de archivo:</label>
            <input
              type="file"
              onChange={(e) => setValue("archivo", e.target.files[0].name)}
              className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
          </div>

          {/* Aceptación de términos */}
          <div>
            <input
              type="checkbox"
              name="aceptaTerminos"
              {...register("aceptaTerminos", {
                required: { value: true, message: "Acepta los términos y condiciones" },
              })}
              className="focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
            />
            <label className="text-gray-900 dark:text-gray-100">Acepto los términos y condiciones</label>
            {errors.aceptaTerminos && <span className="text-red-500">{errors.aceptaTerminos.message}</span>}
          </div>

          {/* Botón para enviar el formulario */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Formulario;
