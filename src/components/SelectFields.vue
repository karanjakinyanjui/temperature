<template>
  <v-container>
    <v-row>
      <v-col md="6">
        <v-card>
          <v-card-title>
            <h2>{{ title }}</h2>
          </v-card-title>
          <v-card-text>
            <FormulateForm v-model="formValues" @submit="handleSubmit">
              <FormulateInput name="name" label="Name" validation="required" />
              <FormulateInput
                name="label"
                label="Label"
                validation="required"
              />
              <FormulateInput
                type="select"
                name="type"
                label="Input Type"
                :options="{
                  text: 'Text',
                  email: 'Email',
                  date: 'Date',
                  select: 'Select',
                  checkbox: 'Checkbox',
                  radio: 'Radio Buttons',
                  date: 'Date',
                  time: 'Time',
                  tel: 'Phone Number',
                }"
              />
              <v-switch
                v-if="placeholder"
                v-model="switch1"
                inset
                :label="
                  `Placeholder as  ${capitalize(
                    switch1 ? formValues['type'] : 'Text'
                  )}`
                "
              ></v-switch>
              <FormulateInput
                v-if="placeholder"
                label="Placeholder"
                name="placeholder"
                :type="switch1 ? formValues['type'] : `text`"
                help="Enter Placeholder (optional)"
              ></FormulateInput>

              <FormulateInput
                v-if="select"
                label="Options"
                name="choices"
                help="Enter options separated by commas"
              ></FormulateInput>
              <FormulateInput
                type="checkbox"
                name="required"
                label="Field is Required"
              />
              <v-row>
                <v-col md="4">
                  <FormulateInput
                    type="submit"
                    :label="edit ? `Update Field` : `Add Field`"
                /></v-col>
                <v-col md="4">
                  <FormulateInput
                    danger
                    type="button"
                    @click="cancel"
                    label="Cancel"
                /></v-col>
              </v-row>
            </FormulateForm>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-card>
          <v-card-title>
            <h2 class="text-center">Preview Fields</h2>
          </v-card-title>
          <v-card-text>
            <FormulateForm>
              <v-row v-for="item in schema" :key="item.name">
                <v-col md="10">
                  <FormulateInput v-bind="item" />
                </v-col>
                <!-- <v-col md="4"> -->
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
                <!-- </v-col> -->
              </v-row>
            </FormulateForm>
            <!-- <FormulateForm v-model="values" :schema="schema" /> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    {{ formValues }}
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      dialogDelete: false,
      formValues: {},
      title: "Add New Field",
      edit: false,
      switch1: false,
      editedIndex: -1,
      values: {},
      schema: [
        {
          label: "First Name",
          name: "first",
        },
        {
          label: "Last Name",
          name: "last",
        },
        {
          label: "Password",
          name: "password",
        },
        {
          label: "Email",
          name: "email",
        },
        {
          label: "State",
          name: "state",
          type: "checkbox",
          options: {
            "New York": "New York",
            Nevada: "Nevada",
            California: "California",
          },
        },
      ],
    }),
    methods: {
      capitalize(s) {
        if (typeof s !== "string") return "";
        return s.charAt(0).toUpperCase() + s.slice(1);
      },
      handleSubmit() {
        if (this.edit) {
          this.schema[this.editedIndex] = this.getField();
          this.editedIndex = -1;
          this.edit = false;
        } else {
          this.schema.push(this.getField());
        }
        this.$nextTick(() => {
          this.formValues = {};
        });
      },
      cancel() {
        this.editedIndex = -1;
        this.edit = false;
        this.formValues = {};
      },
      getField() {
        let s = this.formValues;
        if (s.choices) {
          s.options = {};
          for (let choice of s.choices.split(",").map((i) => i.trim())) {
            s.options[choice] = choice;
          }
        }
        return s;
      },
      editItem(item) {
        this.editedIndex = this.schema.indexOf(item);
        let formValues = Object.assign({}, item);
        this.title = "Edit Field";
        this.edit = true;
        formValues["type"] = formValues["type"] || "text";
        if (formValues["options"]) {
          formValues["choices"] = Object.keys(formValues["options"]).join(", ");
        }
        this.formValues = formValues;
      },
      deleteItem(item) {
        this.editedIndex = this.schema.indexOf(item);
        this.dialogDelete = true;
      },

      deleteItemConfirm() {
        this.schema.splice(this.editedIndex, 1);
        this.closeDelete();
      },

      close() {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = {};
          this.editedIndex = -1;
        });
      },

      closeDelete() {
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.editedItem = {};
          this.editedIndex = -1;
        });
      },
    },
    computed: {
      select: function() {
        return ["select", "checkbox", "radio"].includes(this.formValues.type);
      },
      placeholder: function() {
        return ["text", "email", "date", "time"].includes(this.formValues.type);
      },
    },
  };
</script>
<style>
  button {
    display: block;
  }
  .formulate-input .formulate-input-element {
    max-width: 100% !important;
  }
</style>
