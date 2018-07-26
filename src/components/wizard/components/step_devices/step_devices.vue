<component class="component-step-devices">
    <header class="cf">{{$t('audio devices')}}</header>

    <DevicePicker/>

    <slot name="progress"></slot>

    <div class="buttons is-centered">
        <button class="button cf test-step-telemetry-button-yes is-left" @click="stepBack()">
            {{$t('back')}}
        </button>
        <button class="button is-primary cf test-step-telemetry-button-yes" @click="finishWizard()" :disabled="!selected.ready">
            {{$t('finish')}}
        </button>
    </div>
</component>
