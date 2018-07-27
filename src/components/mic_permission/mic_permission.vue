<component class="component-mic-permission">
    <div class="field">
        <div v-if="settings.webrtc.media.permission">
            <!-- Additional help to guide the user to the browser permission settings. -->
            <div class="mic-meter" v-if="soundmeter">
                <em class="help cf">{{$t('does the microphone of your preferred headset respond?')}}</em>
                <Soundmeter class="soundmeter"/>
            </div>
            <div class="mic-popout-instructions" v-else>
                <div class="browser-bar video-cam-enabled">
                    <icon name="video-cam" class="video-cam"/>
                </div>

                <div class="success-message cf">
                    <i class="check"><icon name="check"/></i>
                    <span class="cf">{{$t('the microphone can be used.')}}</span>
                </div>
            </div>
        </div>

        <div v-else-if="env.isExtension && env.isPopout">
            <div class="mic-popout-notice cf">{{$t('this action will open a new tab to display the request.')}}</div>
            <a class="button is-info" @click="openPopoutView">
                <span class="icon is-small"><icon name="microphone"/></span>
                <span class="cf">{{$t('give permission')}}</span>
            </a>
        </div>

        <!-- Give the user instructions how to enable the microphone in the popout -->
        <div class="mic-popout-instructions" v-else>
            <div class="browser-bar video-cam-disabled">
                <icon name="video-cam-disabled" class="video-cam"/>
            </div>
        </div>
    </div>
</component>
