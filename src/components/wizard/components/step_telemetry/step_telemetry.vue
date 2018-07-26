<component class="component-step-telemetry">
    <header class="ca">{{$t('privacy')}}</header>

    <div class="step-description">
        <span class="cf">{{$t('your privacy is important to us.')}}</span>
        <span class="cf">
            {{$t('we solely collect anonymized data about usage statistics and application errors with the purpose to improve the {name} more efficiently.', {name: app.name})}}
        </span>
        <span class="cf">
            {{$t('do you want to help?')}}
        </span>
        <br/>
        <em class="help cf">{{$t('you can always change your decision afterwards from the privacy settings.')}}</em>
    </div>

    <slot name="progress"></slot>

    <div class="buttons is-centered">
        <button class="button cf test-step-telemetry-button-no" @click="toggleTelemetry(false)">
            {{$t('no thanks')}}
        </button>
        <button class="button is-primary cf test-step-telemetry-button-yes" @click="toggleTelemetry(true)">
            {{$t('no problem')}}
        </button>
    </div>

    <button class="button cf back" @click="stepBack()">{{$t('back')}}</button>

</component>
