<template>
    <div>
        <ul>
            <li v-for="entry in entries(this.content)" :key="entry[0]">
                <span>{{`${entry[0]}: ${entry[1]}`}}</span>
            </li>
        </ul>
        <a>Thinking this is wrong? send us feedback!</a>
    </div>
</template>

<script>
  export default {
    name: 'GeoJsonPopup',
    props: {
      content: Array[String]
    },
    methods: {
      entries(obj) {
        var ownProps = Object.keys(obj),
          i = ownProps.length,
          resArray = new Array(i); // preallocate the Array

        while (i--)
          resArray[i] = [ownProps[i], obj[ownProps[i]]];
        return resArray;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    ul {
        padding: 0;
    }
    li {
        display: block;
    }
</style>
