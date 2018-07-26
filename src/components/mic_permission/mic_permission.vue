<component class="component-mic-permission">
    <div class="field">
        <template v-if="settings.webrtc.media.permission">
            <!-- Additional help to guide the user to the browser permission settings. -->
            <div class="mic-popout-instructions" v-if="soundmeter">
                <em class="help cf">{{$t('does the microphone of the preferred device respond?')}}</em>
                <Soundmeter class="soundmeter"/>
            </div>
            <div class="mic-popout-instructions" v-else>
                <div class="browser-bar video-cam-enabled">
                    <icon name="video-cam" class="video-cam"/>
                    <i class="check"><icon name="check"/></i>
                </div>

                <div class="success-message cf">
                    <span class="cf">{{$t('excellent')}}!</span><br/>
                    <span class="cf">{{$t('the browser has access to your microphone.')}}</span>
                </div>
            </div>
        </template>

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
            <ol>
                <li><span class="cf">{{$t('click the camera icon in the navigation bar.')}}</span></li>
                <li><span class="cf">{{$t('grant permission to use the microphone.')}}</span></li>
                <li v-if="env.isExtension"><span class="cf">{{$t('close this tab.')}}</span></li>
                <li v-else><span class="cf">{{$t('refresh this page.')}}</span></li>
            </ol>
        </div>
    </div>
</component>
