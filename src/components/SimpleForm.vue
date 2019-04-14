<template>
    <section id="app" class="section">
        <form>
            <h1 class="title is-1">
                {{form.formName}}
            </h1>

            <div class="field">
                <label class="label">Identifiers</label>
                <div class="control">
                    <input class="input" type="text" v-model="form.userName" />
                </div>
            </div>


            <div class="field">
                <label class="label">Numbers</label>
                <div class="control1">
                    <input class="input" type="number" v-model="form.Numbers" />
                </div>
            </div>

            <div class="field">
                <label class="label">Date from</label>
                <div class="control1">
                    <input class="input" type="date" v-model="form.dateFrom" />
                </div>
            </div>

            <div class="field">
                <label class="label">Date To</label>
                <div class="control1">
                    <input class="input" type="date" v-model="form.dateTo" />
                </div>
            </div>

            <div class="field">
                <label class="label">Cube</label>
                <div class="control">
                    <div class="select">
                        <select v-model="form.cubeToRun">
                            <option v-for="cube in ['Banana', 'Interactive', 'Locations']" :value="cube" :key="cube">
                                {{cube}}
                            </option>
                        </select>
                    </div>
                </div>
            </div>



            <div class="field">
                <label class="label">Classification Type</label>
                <div class="control">
                    <label>
                        <input type="checkbox" value="Stay" v-model="form.classificationType" />
                        Stay
                    </label>
                    <br>
                    <label>
                        <input type="checkbox" value="Move" v-model="form.classificationType" />
                        Move
                    </label>
                    <br>
                    <label>
                        <input type="checkbox" value="Undefined" v-model="form.classificationType" />
                        Undefined
                    </label>
                </div>
            </div>



            <input class="button is-primary margin-bottom" type="submit" @click.prevent="fakeSubmit" />

        </form>

        <transition name="fade" mode="out-in">
            <article class="message is-primary" v-show="showSubmitFeedback">
                <div class="message-header">
                    <p>Fake Send Status:</p>
                </div>
                <div class="message-body">
                    Successfully Submitted!
                </div>
            </article>
        </transition>

        <hr>

        <h5>
            JSON
        </h5>
        <pre><code>{{form}}</code></pre>
    </section>




</template>

<script>
    import Vue from 'vue';


    new Vue({
        el: '#app',
        data: {
            form: {
                formName: 'Moment\'s Debrief',
                userName: '',
                dateFrom : '',
                dateTo: '',
                numbers: '',
                cubeToRun: 'Interactive',
                classificationType: [],
                workHours: 0
            },
            showSubmitFeedback: false
        },
        methods: {
            fakeSubmit(){
                this.showSubmitFeedback = true;
                setTimeout(() => {
                    this.showSubmitFeedback = false;
                }, 3000);
            }
        }
    });
</script>

<style scoped>




    .margin-bottom {
        margin-bottom: 15px;
    }

    .fade-enter, .fade-leave-active {
        opacity: 0;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }



</style>