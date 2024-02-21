<script setup lang="ts">
import {default as axiosUser} from '@/services/UserDataService';
import RequestPanel from '@/components/RequestPanel.vue';
import type { AuthorizationRequest } from '@/services/models/AuthorizationRequest';
import { ref, type Ref } from 'vue';
import type { SubmitEventPromise } from 'vuetify';
import { type AxiosResponse } from 'axios';
import type { User } from '@/services/models/UserData';
import { useRouter } from 'vue-router';
import { authorizationData as LocalStore, type Authorization } from '@/services/LocalStorageService';

    const routes = useRouter()

    const isValid = ref(false)
    const auth:Ref<AuthorizationRequest> = ref({login:"", password:""})
    const authRules = {
        login: [
            (value:string) => !!value || 'Field is required',
        ],
        password: [
            (value:string) => !!value || 'Field is required'
        ]
    }

    const isLoading = ref(false)
    const newError :Ref<{
            login: string|null;
            password: string|null;
            form: string|null;
        }> = ref({
        login: null,
        password: null,
        form: null
    })
    function onSubmit(e:SubmitEventPromise){
        e.preventDefault()
        if(!isValid) return
        isLoading.value = true

        axiosUser.login(auth.value)
        .then((responce: void|AxiosResponse<any, User>) => {
            if(responce?.status != 200){
                //Error responces should never reach here!
                console.log("UNHANDLED ERROR: ", responce)
                return
            }
            LocalStore.User = responce.data as Authorization
                routes.back()
        })
        .catch(error => {
            console.log(error.response)
            if(error.response)
                newError.value.form = error.response.data
        })
        .finally(() => {
            isLoading.value = false
        })
    }
</script>
<template>
  <RequestPanel
    persistent
    @keyup.up="
      auth.login = 'repotestuser1';
      auth.password = 'repotestuser1';
    "
  >
    <h1>Login</h1>
    <br />
    <v-form v-model="isValid" @submit="onSubmit">
      <v-text-field
        v-model="auth.login"
        required
        :counter="100"
        :rules="authRules.login"
        type="login"
        label="Login"
        :error-messages="newError.login"
        @change="
          newError.login = null;
          newError.form = null;
        "
      >
      </v-text-field>
      <v-text-field
        v-model="auth.password"
        required
        :counter="100"
        :rules="authRules.login"
        type="password"
        label="Password"
        :error-messages="newError.password"
        @change="
          newError.password = null;
          newError.form = null;
        "
      >
      </v-text-field>
      <v-btn
        type="submit"
        block
        class="mt-2"
        color="primary"
        :disabled="isLoading"
        :loading="isLoading"
      >
        Log In</v-btn
      >
    </v-form>
    <v-sheet v-show="newError.form"
      ><v-icon icon="mdi-alert" color="error" /><br />
      <span class="text-error">
        {{ newError.form }}
      </span>
    </v-sheet>
  </RequestPanel>
</template>
