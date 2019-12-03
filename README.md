## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm start

# build for production with minification
npm run build
```

## DynamicForm

### i18n

It's necessary to follow a pattern at the i18n files, in order to have all the labels and titles at dynamic form to display correctly.

**Note: integrates to Reactify+MaterialUI ecosystem or at least MaterialUI.**

#### Fields

for each field you need to create a line at the locale file with the **_model name_** and **_field name_**. Also you need to create a **_model name_** and **_\$title_** property to hold the form title

locale file

```js
"MODEL_NAME.form.$title":"Form Title"
"MODEL_NAME.form.FIELD_A_NAME":"Field A name"
"MODEL_NAME.form.FIELD_B_NAME":"Field B name"
```

### Styling

To add style to an specific field, you only need to add an style property to the **_model.\$fieldConfig_** property of the field How to use:

```js
model.$fieldConfig.myField.style = {
  wrapper: {
    /*HERE you can use styling properties. They'll be applied to the field wrapper*/
  },
  field: {
    /*HERE you can use styling properties. They'll be applied to the field itself */
  },
  break: true | false /* If true, the layout will break after the field. */
};
```

All field wrappers are inside a flex box, row direction, with wrap:wrap.

You can control the size of the field by using **_flexBasis_** property to set the minimum width, and **_maxWidth_** to, well, set the max width. Both need to be applied to the **_wrapper_**.

Every styling property is accepted but it's effect will be limited due to the type of each component

### ArrayOf Object - Configuring List Item

To configure the list item you need to set a property to the **_model.\$fieldConfig_** property of the field. How to use:

```js
//listItemProperties is an array that takes up to 3 string entries
//Each entry corresponds to a line at the listItem component
model.$fieldConfig.myField.listItemProperties = [
  "prop1", //First line
  "prop2", //Second line
  "prop3" //Third line
];
```

If you need a more complex text at a line set a function instead of a string

```js
model.$fieldConfig.myField.listItemProperties = [
  item => item.prop1 + " custom" + item.prop2,
  "prop2",
  "prop3"
];
```

### Id of ModelBase - Configuring Search, List Item and Display

To configure the search field you need to set a property to the **_model.\$fieldConfig_** property of the field. How to use:

```js
model.$fieldConfig.myField.searchField = "propertyToSearchOn";
```

To configure the search list item you need to set a property to the **model.\$fieldConfig** property of the field

```js
//searchListItemProperties is an array that takes up to 3 string entries
//Each entry corresponds to a line at the listItem component
model.$fieldConfig.myField.searchListItemProperties = [
  "prop1", //First line
  "prop2", //Second line
  "prop3" //Third line
];
```

If you need a more complex text at a line set a function instead of a string

```js
model.$fieldConfig.myField.searchListItemProperties = [
  item => item.prop1 + " custom" + item.prop2,
  "prop2",
  "prop3"
];
```
