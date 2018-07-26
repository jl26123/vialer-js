<component class="component-step-voipaccount">
    <header class="ca">{{$t('softphone accounts')}}</header>

    <div class="step-description">
        <span class="cf">{{$t('the {name} requires a VoIP account to be able to make calls. Choose one of the available accounts from the dropdown beneath to proceed.', {name: app.name})}}</span>
    </div>
    <VoipaccountPicker :label="$t('available accounts')" :v="$v"/>
    <slot name="progress"></slot>

    <div class="buttons is-centered">
        <button class="button cf test-step-voipaccount-back is-left" @click="stepBack()">
            {{$t('back')}}
        </button>
        <button class="button is-primary cf test-step-voipaccount-choose" @click="chooseAccount()" :disabled="!selected.ready">
            {{$t('choose account')}}
        </button>
    </div>
</component>
