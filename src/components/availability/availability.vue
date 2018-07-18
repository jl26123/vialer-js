<component class="component-availability panel-content">
    <h1 class="uc">{{$t('availability options')}}</h1>

    <Field name="dnd_availability" type="checkbox"
        css="is-warning"
        :disabled="!webrtc.enabled"
        :help="$t('decline all incoming softphone calls.')"
        :label="$t('do not disturb')"
        :model.sync="dnd"/>

    <!-- Load addons here -->
</component>
