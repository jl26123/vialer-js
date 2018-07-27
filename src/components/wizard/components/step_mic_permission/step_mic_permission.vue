<component class="component-step-mic-permission">
    <header class="cf">{{$t('microphone access')}}</header>

    <div class="step-description">
        <span class="cf">{{$t('the {name} needs access to your microphone before a call can be made.', {name: app.name})}}</span>
        <MicPermission :soundmeter="false" />
        <span class="after-permission-text cf" v-if="permission">
            {{$t('almost there! Let\'s review your audio settings now to make sure that the correct audio devices will be used.', {name: app.name})}}
        </span>
        <slot name="progress"></slot>

        <div class="buttons is-centered">
            <button class="button cf test-step-telemetry-button-yes is-left" @click="stepBack()">
                {{$t('back')}}
            </button>

            <button class="button is-primary cf test-step-telemetry-button-yes" @click="stepNext()" :disabled="!stepValid">
                {{$t('setup audio')}}
            </button>
        </div>
    </div>
</component>
