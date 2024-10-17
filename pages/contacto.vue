<script setup lang="ts">
import { object, string, number, type InferType } from "yup";

const config = useRuntimeConfig();

const formData = ref({
  nombre: "",
  apellido: "",
  email: "",
  tipoContacto: "",
  mensaje: "",
});

const tipoDeContactoList = [
  "Quiero sugerir información faltante",
  "Quiero anunciar mi producto o servicio",
  "Otro",
];

const schema = object({
  nombre: string()
    .min(3, "Nombre debe contener al menos 3 caracteres")
    .required("Nombre es un campo obligatorio"),
  apellido: string()
    .min(3, "Apellido debe contener al menos 3 caracteres")
    .required("Apellido es un campo obligatorio"),
  email: string()
    .email("Invalid email")
    .required("Email es un campo obligatorio"),
  tipoContacto: string()
    .oneOf(
      tipoDeContactoList,
      "Motivo dede ser uno de los siguientes valores: " +
        tipoDeContactoList.join(", "),
    )
    .required("Motivo es un campo obligatorio"),
  mensaje: string().required("Mensaje es un campo obligatorio"),
});

type Schema = InferType<typeof schema>;
const formStatus: any = ref(null);

const onSubmit = async () => {
  try {
    await $fetch(`${config.public.apiBackend}/api/contacto/`, {
      method: "POST",
      body: {
        nombre: formData.value.nombre,
        apellido: formData.value.apellido,
        email: formData.value.email,
        tipoContacto: formData.value.tipoContacto,
        mensaje: formData.value.mensaje,
      },
    });
    formStatus.value = 200;
    formData.value = {
      nombre: "",
      apellido: "",
      email: "",
      tipoContacto: "",
      mensaje: "",
    };
  } catch (error: any) {
    formStatus.value = error.status;
  }
};
</script>
<template>
  <div
    class="rounded border border-slate-300 bg-white p-4 shadow outline outline-1 outline-slate-300/40 md:p-6"
  >
    <h2 class="mb-8 text-3xl font-bold md:text-5xl">Formulario de contacto</h2>
    <UForm
      :schema="schema"
      :state="formData"
      class="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2"
      @submit="onSubmit"
    >
      <UFormGroup
        label="Nombre"
        name="nombre"
        :ui="{
          label: {
            base: 'text-lg font-medium',
          },
        }"
        class="col-span-1"
      >
        <input
          v-model="formData.nombre"
          class="focus:ring-primary-500 relative block w-full rounded-md border-0 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-75"
          placeholder="Ingrese su nombre"
          size="xl"
        />
      </UFormGroup>
      <UFormGroup
        label="Apellido"
        name="apellido"
        :ui="{
          label: {
            base: 'text-lg font-medium',
          },
        }"
        class="col-span-1"
      >
        <input
          class="focus:ring-primary-500 relative block w-full rounded-md border-0 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-75"
          v-model="formData.apellido"
          placeholder="Ingrese su apellido"
          size="xl"
        />
      </UFormGroup>
      <UFormGroup
        label="Email"
        name="email"
        :ui="{
          label: {
            base: 'text-lg font-medium',
          },
        }"
        class="col-span-1 md:col-span-2"
      >
        <input
          class="focus:ring-primary-500 relative block w-full rounded-md border-0 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-75"
          v-model="formData.email"
          placeholder="Ingrese su email"
          size="xl"
        />
      </UFormGroup>
      <UFormGroup
        label="Motivo"
        name="tipoContacto"
        :ui="{
          label: {
            base: 'text-lg font-medium',
          },
        }"
        class="col-span-1 md:col-span-2"
      >
        <USelectMenu
          :options="tipoDeContactoList"
          v-model="formData.tipoContacto"
          size="xl"
          class="md:col-span-2"
          placeholder="Motivo del contacto"
        />
      </UFormGroup>
      <UFormGroup
        label="Mensaje"
        name="mensaje"
        :ui="{
          label: {
            base: 'text-lg font-medium',
          },
        }"
        class="col-span-1 md:col-span-2"
      >
        <textarea
          class="focus:ring-primary-500 relative block w-full rounded-md border-0 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-75"
          v-model="formData.mensaje"
          placeholder="Ingrese su mensaje"
          size="xl"
          :maxlength="500"
          autoresize
          resize
        />
      </UFormGroup>
      <div class="md:col-span-2">
        <UAlert
          v-if="formStatus != null"
          :color="formStatus === 200 ? 'green' : 'red'"
          variant="soft"
          :description="
            formStatus === 200
              ? 'Tu contacto ha sido recibido y seras contactado por email'
              : 'Algo salio mal, reintentalo más tarde'
          "
        >
        </UAlert>
      </div>
      <div class="flex justify-end md:col-span-2">
        <UButton type="submit" size="xl" class="px-4 font-semibold uppercase">
          Enviar
        </UButton>
      </div>
    </UForm>
  </div>
</template>
