<component class="component-main" id="app">
    <!-- Force the telemetry window to show up -->
    <Notifications :class="classes('notifications')"/>
    <Wizard v-if="!wizard.completed && user.authenticated"/>
    <div v-else>
        <div class="overlay" v-if="overlay">
            <div class="close-button" @click="closeOverlay()">
                <icon name="close"/>
            </div>
            <About v-if="overlay==='about'"/>
        </div>

        <MainStatusBar v-if="!callOngoing"/>
        <MainCallBar v-if="callOngoing && call.active" :call="call" v-for="call in calls"/>

        <div class="panel" :class="classes('panel')">
            <Login v-if="!user.authenticated" class="panel-content"/>
            <template v-else>
                <MainMenuBar/>
                <component v-bind:is="layer"></component>
            </template>
        </div>
    </div>
</component>
