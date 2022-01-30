<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> Login </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header>
        <ion-toolbar>
          <ion-title> Login </ion-title>
        </ion-toolbar>
      </ion-header>
      <form novalidate @submit.prevent="submitForm">
        <ion-label position="stacked" color="primary">email</ion-label>
        <ion-input name="email" v-model="email"></ion-input>
        <span>{{ emailError }}</span>
        <ion-label position="stacked" color="primary">password</ion-label>
        <ion-input type="password" name="password" v-model="password"></ion-input>
        <span>{{ passwordError }}</span>
        <ion-button type="submit" :disabled="!meta.valid">Login</ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonToolbar,
  IonLabel,
  IonInput,
  IonButton
} from "@ionic/vue";
import { useField, useForm } from 'vee-validate';
import httpClient from '../lib/http';
import * as yup from "yup";

export default defineComponent({
  name: "page-login",
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonToolbar,
    IonLabel,
    IonInput,
    IonButton
  },
  setup() {
        const schema = {
            email: yup.string().email().required(),
            password: yup.string().required()
        }
        const { meta } = useForm({
            validationSchema: schema
        })
        const { value: email, errorMessage: emailError } = useField('email');
        const { value: password, errorMessage: passwordError } = useField('password');

        const store = useStore();
        const router = useRouter();

        function submitForm() {
            console.log("Form submited", email, password);
            
            httpClient
            .post("login_check", {
                username: email.value,
                password: password.value,
            })
            // .then((res: any) => res.data)
            .then((res: any) => {
            console.log("response", res);
            store.commit('setToken', {token: res.token});
            // localStorage.setItem("token", res.token);
            router.push("/");
            })
            .catch((err: any) => {
            console.error("Error", err);
            });
        }

        return {
            submitForm,
            meta,
            email,
            emailError,
            password,
            passwordError
        }
    }
});
</script>

<style></style>
