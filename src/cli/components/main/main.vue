<screen ref='screen' :smartCSR="true" :keys="true" :autoPadding="true">
    <box :style="styles.boxHeader" width="100%" height="15%">
        <text :style="styles.textHeader" top="top" left="center" :content="title"/>
        <list height="100%" width="100%" :border="{}"
            :items="options"
            :style="styles.listContent"
            :keys="true" :mouse="true"
            @select="handleListSelect"/>
    </box>
    <box :style="styles.boxContent" width="100%" height="92%" top="9%">
        <list height="100%" width="100%" :border="{}"
            :items="options"
            :style="styles.listContent"
            :keys="true" :mouse="true"
            @select="handleListSelect"/>
    </box>
</screen>
