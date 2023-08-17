<script setup lang="ts">

const colegios = [
  {
    rbd: 25642,
    nombre: "ESCUELA BAS. MUNIC. CUYUNCAVI",
    dependencia: "PUBLICO",
    habilitadoPostular: true,
    nivelMinimo: "Pre-Kinder",
    nivelMaximo: "8º Básico",
    etiquetas: ["PIE", "SEP", "GRATUITO"],
    informacionInstitucional: {
      alumnosMatriculados: 205,
      promedioAlumnosPorCurso: 20,
      regimen: "Mixto",
    },
    sedes: [
      {
        codigoSede: 1,
        direccion: {
          region: "Metropolitana De Santiago",
          comuna: "Curacaví",
          calle: "LOS PATRIOTAS 2040",
          coordenadas: {
            type: "Point",
            coordinates: [-71.12337, -33.39],
          },
        },
      },
    ],
    imagenes: [
      {
        nombre: "https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg",
      },
    ],
    distancia: 0.0,
    procesosEspeciales: [],
  },
  {
    rbd: 10852,
    nombre: "ESCUELA BASICA N°403 NUESTRA SRA. DE LA GUARDIA",
    dependencia: "PARTICULAR SUBVENCIONADO",
    habilitadoPostular: true,
    nivelMinimo: "Pre-Kinder",
    nivelMaximo: "8º Básico",
    etiquetas: ["SEP", "GRATUITO"],
    informacionInstitucional: {
      alumnosMatriculados: 322,
      promedioAlumnosPorCurso: 32,
      regimen: "Mixto",
    },
    sedes: [
      {
        codigoSede: 1,
        direccion: {
          region: "Metropolitana De Santiago",
          comuna: "Curacaví",
          calle: "LA LAGUNA S/N, CAMINO A MARIA PINTO S/N",
          coordenadas: {
            type: "Point",
            coordinates: [-71.04775, -33.48556],
          },
        },
      },
    ],
    imagenes: [
      {
        nombre: "https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg",
      },
    ],
    distancia: 0.0,
    procesosEspeciales: [],
  },
  {
    rbd: 10851,
    nombre: "COLEGIO INSTITUTO SAN LUIS DE CURACAVI",
    dependencia: "PARTICULAR SUBVENCIONADO",
    habilitadoPostular: true,
    nivelMinimo: "Pre-Kinder",
    nivelMaximo: "IV Medio",
    etiquetas: ["_4MEDIO"],
    informacionInstitucional: {
      alumnosMatriculados: 363,
      promedioAlumnosPorCurso: 25,
      regimen: "Mixto",
    },
    sedes: [
      {
        codigoSede: 1,
        direccion: {
          region: "Metropolitana De Santiago",
          comuna: "Curacaví",
          calle: "LAS ROSAS 264",
          coordenadas: {
            type: "Point",
            coordinates: [-71.13079, -33.40493],
          },
        },
      },
    ],
    imagenes: [
      {
        nombre: "https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg",
      },
    ],
    distancia: 0.0,
    procesosEspeciales: [],
  },
  {
    rbd: 20348,
    nombre: "NORTH CROSS SCHOOL",
    dependencia: "PARTICULAR SUBVENCIONADO",
    habilitadoPostular: true,
    nivelMinimo: "Pre-Kinder",
    nivelMaximo: "IV Medio",
    etiquetas: ["SEP", "_4MEDIO", "GRATUITO"],
    informacionInstitucional: {
      alumnosMatriculados: 701,
      promedioAlumnosPorCurso: 38,
      regimen: "Mixto",
    },
    sedes: [
      {
        codigoSede: 1,
        direccion: {
          region: "Metropolitana De Santiago",
          comuna: "Curacaví",
          calle: "PRESBITERO MORAGA SUR 168",
          coordenadas: {
            type: "Point",
            coordinates: [-71.12857, -33.40429],
          },
        },
      },
    ],
    imagenes: [
      {
        nombre: "https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg",
      },
    ],
    distancia: 0.0,
    procesosEspeciales: [],
  },
  {
    rbd: 8936,
    nombre: "ESCUELA BASICA Y ESPECIAL MC-KAY",
    dependencia: "PARTICULAR SUBVENCIONADO",
    habilitadoPostular: true,
    nivelMinimo: "1º Básico",
    nivelMaximo: "4º Básico",
    etiquetas: ["SEP", "GRATUITO"],
    informacionInstitucional: {
      alumnosMatriculados: 206,
      promedioAlumnosPorCurso: 12,
      regimen: "Mixto",
    },
    sedes: [
      {
        codigoSede: 1,
        direccion: {
          region: "Metropolitana De Santiago",
          comuna: "Curacaví",
          calle: "FRANCISCO SAAVEDRA 1975",
          coordenadas: {
            type: "Point",
            coordinates: [-71.12919, -33.39959],
          },
        },
      },
    ],
    imagenes: [
      {
        nombre: "https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg",
      },
    ],
    distancia: 0.0,
    procesosEspeciales: [],
  },
  {
    rbd: 10849,
    nombre: "ESCUELA HERIBERTO ERLWEIN  S.",
    dependencia: "PUBLICO",
    habilitadoPostular: true,
    nivelMinimo: "1º Básico",
    nivelMaximo: "6º Básico",
    etiquetas: ["SEP", "GRATUITO"],
    informacionInstitucional: {
      alumnosMatriculados: 9,
      promedioAlumnosPorCurso: 3,
      regimen: "Mixto",
    },
    sedes: [
      {
        codigoSede: 1,
        direccion: {
          region: "Metropolitana De Santiago",
          comuna: "Curacaví",
          calle: "CAMINO PUBLICO S/N PANGUE KM.26 1/2 S/N",
          coordenadas: {
            type: "Point",
            coordinates: [-71.19695, -33.26504],
          },
        },
      },
    ],
    imagenes: [
      {
        nombre: "https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg",
      },
    ],
    distancia: 0.0,
    procesosEspeciales: [],
  },
  {
    rbd: 25526,
    nombre: "ESCUELA PART.  CURACAVI COLLEGE",
    dependencia: "PARTICULAR SUBVENCIONADO",
    habilitadoPostular: true,
    nivelMinimo: "Pre-Kinder",
    nivelMaximo: "IV Medio",
    etiquetas: ["SEP", "_4MEDIO", "GRATUITO"],
    informacionInstitucional: {
      alumnosMatriculados: 1070,
      promedioAlumnosPorCurso: 41,
      regimen: "Mixto",
    },
    sedes: [
      {
        codigoSede: 1,
        direccion: {
          region: "Metropolitana De Santiago",
          comuna: "Curacaví",
          calle: "PRESBITERO MORAGA SUR 450",
          coordenadas: {
            type: "Point",
            coordinates: [-71.12698, -33.40532],
          },
        },
      },
    ],
    imagenes: [
    {
        nombre: "https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg",
      },
    ],
    distancia: 0.0,
    procesosEspeciales: [],
  },
  {
    rbd: 32140,
    nombre: "ESCUELA BÁSICA Nº 211 INCLUSIVA SANTA MARIA",
    dependencia: "PARTICULAR SUBVENCIONADO",
    habilitadoPostular: true,
    nivelMinimo: "Pre-Kinder",
    nivelMaximo: "8º Básico",
    etiquetas: ["PIE", "SEP", "GRATUITO"],
    informacionInstitucional: {
      alumnosMatriculados: 161,
      promedioAlumnosPorCurso: 17,
      regimen: "Mixto",
    },
    sedes: [
      {
        codigoSede: 1,
        direccion: {
          region: "Metropolitana De Santiago",
          comuna: "Curacaví",
          calle: "AVDA. AMBROSIO O`HIGGINS 1399",
          coordenadas: {
            type: "Point",
            coordinates: [-71.13599, -33.40521],
          },
        },
      },
    ],
    imagenes: [
    {
        nombre: "https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg",
      },
    ],
    distancia: 0.0,
    procesosEspeciales: [],
  },
  {
    rbd: 10844,
    nombre: "ESCUELA SAN JOSE OBRERO DE CURACAVI",
    dependencia: "PUBLICO",
    habilitadoPostular: true,
    nivelMinimo: "Pre-Kinder",
    nivelMaximo: "8º Básico",
    etiquetas: ["PIE", "SEP", "GRATUITO"],
    informacionInstitucional: {
      alumnosMatriculados: 630,
      promedioAlumnosPorCurso: 35,
      regimen: "Mixto",
    },
    sedes: [
      {
        codigoSede: 1,
        direccion: {
          region: "Metropolitana De Santiago",
          comuna: "Curacaví",
          calle: "AVENIDA AMBROSIO O`HIGGINS 725",
          coordenadas: {
            type: "Point",
            coordinates: [-71.14345, -33.4083],
          },
        },
      },
    ],
    imagenes: [
    {
        nombre: "https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg",
      },
    ],
    distancia: 0.0,
    procesosEspeciales: [],
  },
  {
    rbd: 10848,
    nombre: "ESCUELA ELIECER PEREZ VARGAS",
    dependencia: "PUBLICO",
    habilitadoPostular: true,
    nivelMinimo: "Pre-Kinder",
    nivelMaximo: "8º Básico",
    etiquetas: ["PIE", "SEP", "GRATUITO"],
    informacionInstitucional: {
      alumnosMatriculados: 257,
      promedioAlumnosPorCurso: 25,
      regimen: "Mixto",
    },
    sedes: [
      {
        codigoSede: 1,
        direccion: {
          region: "Metropolitana De Santiago",
          comuna: "Curacaví",
          calle: "RUTA 68 KM. 35.5 S/N",
          coordenadas: {
            type: "Point",
            coordinates: [-71.06358, -33.41047],
          },
        },
      },
    ],
    imagenes: [
    {
        nombre: "https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg",
      },
    ],
    distancia: 0.0,
    procesosEspeciales: [],
  },
  {
    rbd: 11886,
    nombre: "ESCUELA BASICA EL CARMELO",
    dependencia: "PARTICULAR SUBVENCIONADO",
    habilitadoPostular: true,
    nivelMinimo: "Pre-Kinder",
    nivelMaximo: "8º Básico",
    etiquetas: ["PIE", "SEP", "GRATUITO"],
    informacionInstitucional: {
      alumnosMatriculados: 315,
      promedioAlumnosPorCurso: 31,
      regimen: "Mixto",
    },
    sedes: [
      {
        codigoSede: 1,
        direccion: {
          region: "Metropolitana De Santiago",
          comuna: "Curacaví",
          calle: "FRANCISCO PALAU S/N LO PRADO CURACAVÍ S/N",
          coordenadas: {
            type: "Point",
            coordinates: [-70.99183, -33.48375],
          },
        },
      },
    ],
    imagenes: [
    {
        nombre: "https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg",
      },
    ],
    distancia: 0.0,
    procesosEspeciales: [],
  },
  {
    rbd: 10846,
    nombre: "ESCUELA FERNANDO CARVAJAL PINTO",
    dependencia: "PUBLICO",
    habilitadoPostular: true,
    nivelMinimo: "Pre-Kinder",
    nivelMaximo: "8º Básico",
    etiquetas: ["PIE", "SEP", "GRATUITO"],
    informacionInstitucional: {
      alumnosMatriculados: 233,
      promedioAlumnosPorCurso: 23,
      regimen: "Mixto",
    },
    sedes: [
      {
        codigoSede: 1,
        direccion: {
          region: "Metropolitana De Santiago",
          comuna: "Curacaví",
          calle: "RUTA G-68 KM. 33 S/N",
          coordenadas: {
            type: "Point",
            coordinates: [-71.02839, -33.45357],
          },
        },
      },
    ],
    imagenes: [
    {
        nombre: "https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg",
      },
    ],
    distancia: 0.0,
    procesosEspeciales: [],
  },
  {
    rbd: 10842,
    nombre: "ESCUELA BASICA VALLE DE PUANGUE",
    dependencia: "PUBLICO",
    habilitadoPostular: true,
    nivelMinimo: "Pre-Kinder",
    nivelMaximo: "8º Básico",
    etiquetas: ["PIE", "SEP", "GRATUITO"],
    informacionInstitucional: {
      alumnosMatriculados: 505,
      promedioAlumnosPorCurso: 28,
      regimen: "Mixto",
    },
    sedes: [
      {
        codigoSede: 1,
        direccion: {
          region: "Metropolitana De Santiago",
          comuna: "Curacaví",
          calle: "JORGE MONTT 1868",
          coordenadas: {
            type: "Point",
            coordinates: [-71.13175, -33.40087],
          },
        },
      },
    ],
    imagenes: [
    {
        nombre: "https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg",
      },
    ],
    distancia: 0.0,
    procesosEspeciales: [],
  },
  {
    rbd: 10845,
    nombre: "LICEO BICENTENARIO PRESIDENTE BALMACEDA",
    dependencia: "PUBLICO",
    habilitadoPostular: true,
    nivelMinimo: "I Medio",
    nivelMaximo: "IV Medio",
    etiquetas: ["PIE", "SEP", "_4MEDIO", "TECNICO_PROFESIONAL", "GRATUITO"],
    informacionInstitucional: {
      alumnosMatriculados: 899,
      promedioAlumnosPorCurso: 32,
      regimen: "Mixto",
    },
    sedes: [
      {
        codigoSede: 1,
        direccion: {
          region: "Metropolitana De Santiago",
          comuna: "Curacaví",
          calle: "COVADONGA 458",
          coordenadas: {
            type: "Point",
            coordinates: [-71.13081, -33.39942],
          },
        },
      },
    ],
    imagenes: [
    {
        nombre: "https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg",
      },
    ],
    distancia: 0.0,
    procesosEspeciales: [],
  },
  {
    rbd: 25356,
    nombre: "ESC. BASICA LA PRADERA DE CURACAVI",
    dependencia: "PARTICULAR SUBVENCIONADO",
    habilitadoPostular: true,
    nivelMinimo: "Pre-Kinder",
    nivelMaximo: "8º Básico",
    etiquetas: ["SEP"],
    informacionInstitucional: {
      alumnosMatriculados: 264,
      promedioAlumnosPorCurso: 26,
      regimen: "Mixto",
    },
    sedes: [
      {
        codigoSede: 1,
        direccion: {
          region: "Metropolitana De Santiago",
          comuna: "Curacaví",
          calle: "ISABEL RIQUELME 382",
          coordenadas: {
            type: "Point",
            coordinates: [-71.14871, -33.40687],
          },
        },
      },
    ],
    imagenes: [
    {
        nombre: "https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg",
      },
    ],
    distancia: 0.0,
    procesosEspeciales: [],
  },
  {
    rbd: 24759,
    nombre: "ESC.NUESTRA SENORA DEL CARMEN DE CURACAV",
    dependencia: "PARTICULAR SUBVENCIONADO",
    habilitadoPostular: true,
    nivelMinimo: "Pre-Kinder",
    nivelMaximo: "IV Medio",
    etiquetas: ["PIE", "SEP", "_4MEDIO", "GRATUITO"],
    informacionInstitucional: {
      alumnosMatriculados: 468,
      promedioAlumnosPorCurso: 33,
      regimen: "Mixto",
    },
    sedes: [
      {
        codigoSede: 1,
        direccion: {
          region: "Metropolitana De Santiago",
          comuna: "Curacaví",
          calle: "INDEPENDENCIA 1949",
          coordenadas: {
            type: "Point",
            coordinates: [-71.12771, -33.39028],
          },
        },
      },
    ],
    imagenes: [
    {
        nombre: "https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg",
      },
    ],
    distancia: 0.0,
    procesosEspeciales: [],
  },
];

const autoridadStore = useAutoridadStore()
const colegioStore = useColegioStore()

const loadingAlcalde = ref(false)
const loadingConcejales = ref(false)
const loadingColegios = ref(false)

const handleSearch = async () => {
  loadingAlcalde.value = true
  loadingConcejales.value = true
  loadingColegios.value = true
  await autoridadStore.fetchAlcaldes()
  loadingAlcalde.value = false
  await autoridadStore.fetchConcejales()
  loadingConcejales.value = false
  await colegioStore.fetchColegios()
}

await handleSearch()

</script>
<template>
  <div >
    <div class="text-3xl font-medium">Curacavi</div>

    <section class="py-10">
      <h3 class="text-xl font-medium">Autoridades comunales</h3>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-4"
      >
        <ClientOnly>
          <NuxtLink
            :to="`/alcalde/${item.id}`"
            class="border rounded-md relative group overflow-hidden hover:shadow-md transition duration-500 ease-in-out"
            v-for="item in autoridadStore.alcaldes"
            :key="item.name"
          >
            <div
              class="absolute rounded-md top-0 left-0 bg-gradient-to-t from-slate-950/60 to-transparent py-4 px-3 rounded-br-md w-full h-full flex flex-col justify-between text-slate-50 z-10"
            >
              <p
                class="text-sm bg-slate-800/50 rounded-md w-fit px-1 py-0.5 font-medium"
              >
                Alcalde
              </p>
              <div>
                <h3 class="font-medium text-lg">
                  {{ item.name }}
                </h3>
                <p class="break-all text-xs">{{
                  item.email
                }}</p>
              </div>
            </div>
            <NuxtImg
              :src="item.image"
              :alt="item.name"
              class="w-full aspect-[3/4] object-cover rounded-md group-hover:scale-105 group-hover:transition-all group-hover:duration-300 group-hover:ease-linear group-hover:cursor-pointer -z-20"
            />
          </NuxtLink>
          <NuxtLink
            :to="`/concejal/${item.id}`"
            class="border rounded-md relative group overflow-hidden hover:shadow-md transition duration-500 ease-in-out"
            v-for="item in autoridadStore.concejales"
            :key="item.name"
          >
            <div
              class="absolute rounded-md top-0 left-0 bg-gradient-to-t from-slate-950/60 to-transparent py-4 px-3 rounded-br-md w-full h-full flex flex-col justify-between text-slate-50 z-10"
            >
              <p
                class="text-sm bg-slate-800/50 rounded-md w-fit px-1 py-0.5 font-medium"
              >
                Concejal
              </p>
              <div>
              <h3 class="font-medium text-lg">
                {{ item.name }}
              </h3>
              <p class="break-all text-xs">{{
                item.email
              }}</p>
  
              </div>
            </div>
            <NuxtImg
              :src="item.image"
              :alt="item.name"
              class="w-full aspect-[3/4] object-cover rounded-md group-hover:scale-105 group-hover:transition-all group-hover:duration-500 group-hover:ease-in-out group-hover:cursor-pointer -z-20"
            />
          </NuxtLink>
        </ClientOnly>
      </div>
    </section>

    <section class="py-10">
      <h3 class="text-xl font-medium">Colegios</h3>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-4"
      >
        <ClientOnly>
          <NuxtLink
            :to="`/colegio/${colegio.id}`"
            v-for="colegio in colegioStore.colegios"
            :key="colegio.rbd"
            class="border border-slate-300 rounded-md hover:shadow-md transition duration-500 ease-in-out"
          >
            <div class="relative text-sm font-medium">
              <NuxtImg
                :src="colegio.cover_image ?? 'https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg'"
                :alt="colegio.nombre"
                class="w-full aspect-[5/6] object-cover rounded-t-md"
              />
              <div
                class="absolute top-0 h-full flex flex-col bg-gradient-to-t from-black/50 to-transparent text-white w-full left-0 justify-between p-2"
              >
                <p class="w-fit bg-black/50 px-1 py-0.5 flex items-center gap-1 text-white rounded text-xs">
                  <div class="flex">
                    <Icon
                      name="heroicons:currency-dollar-20-solid"
                      class="w-4 h-4"
                    />
                  </div>
                  {{ colegio.dependencia }}
                </p>
                <p class="w-fit">
                  {{ colegio.nombre }}
                </p>
              </div>
            </div>
            <div class="p-2 text-sm items-start flex gap-1">
              <div class="flex translate-y-0.5">
                <Icon
                  name="heroicons:map-pin-20-solid"
                  class="w-4 h-4 text-slate-600"
                />
              </div>
              <p>
                {{ colegio.calle }}
              </p>
            </div>
          </NuxtLink>
        </ClientOnly>
      </div>
    </section>
    <!-- <section class="relative h-96 w-full">
      <MapboxMap
        map-id="{ID}"
        style=""
        :options="{
          style: 'mapbox://styles/mapbox/light-v11', // style URL
          center: [-68.137343, 45.137451], // starting position
          zoom: 5, // starting zoom
        }"
      >
        <MapboxDefaultMarker
          marker-id="marker1"
          :options="{}"
          :lnglat="[-68.137343, 45.137451]"
        >
        </MapboxDefaultMarker>
      </MapboxMap>
    </section> -->
  </div>
</template>
