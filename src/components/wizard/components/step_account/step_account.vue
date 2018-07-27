<component class="component-step-account">
    <header class="ca">{{$t('softphone accounts')}}</header>

    <div class="step-description">
        <span class="cf">{{$t('the {name} needs a VoIP account to make calls. Choose one of the available accounts below to proceed:', {name: app.name})}}</span>
    </div>
    <AccountPicker :label="$t('available accounts')" :v="$v"/>
    <slot name="progress"></slot>

    <div class="buttons is-centered">
        <button class="button cf test-step-voipaccount-back is-left" @click="stepBack()">
            {{$t('back')}}
        </button>
        <button class="button is-primary cf test-step-voipaccount-choose" @click="chooseAccount()" :disabled="!stepValid">
            {{$t('choose account')}}
        </button>
    </div>
</component>
