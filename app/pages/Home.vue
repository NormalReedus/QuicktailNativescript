<template>
    <Page actionBarHidden="true" >

		<!-- <StackLayout> -->
				<!-- <StackLayout class="themeSwitch">
				<Label :text="theme"/>
					<Switch :checked="darkTheme" @checkedChange="test($event)/*$emit('themeChange', $event)*/" horizontalAlignment="center"/>
				</StackLayout> -->

        <FlexboxLayout flexDirection="column" class="home">

            <Label class="h1 greeting" textWrap="true">What would you like to do?</Label>

            <FlexboxLayout>

                <FlexboxLayout class="button-container">
                    <Image src="~/create_btn.png" @tap="navToCreate" class="m-x-25 img" />
                    <Label class="h2">Create</Label>
                </FlexboxLayout>

                <FlexboxLayout class="button-container">
                    <Image src="~/cocktails_btn.png" @tap="navToCocktails" class="m-x-25 img" />
                    <Label class="h2">Cocktails</Label>
                </FlexboxLayout>

            </FlexboxLayout>

						<!-- TEST -->
						<Button @tap="keys" class="-primary">Keys</Button>
						<Button @tap="val" class="-outline">Value</Button>
						<Button @tap="clear" class="-danger">Clear</Button>

        </FlexboxLayout>
		<!-- </StackLayout> -->

    </Page>
</template>

<script>
    import Create from "./Create";
		import Cocktails from "./Cocktails";
		const appSettings = require('tns-core-modules/application-settings')

    export default {
        name: "Home",
        components: {
            Create,
            Cocktails
        },

				// props: {
				// 	darkTheme: Boolean
				// },

				// computed: {
				// 	theme() {
				// 		return this.darkTheme ? 'Dark' : 'Light'
				// 	}
				// },

        methods: {
            navToCreate() {
                this.$navigateTo(Create);
            },

            navToCocktails() {
                this.$navigateTo(Cocktails);
						},
						
						keys() {
							console.log(appSettings.getAllKeys())
						},

						val() {
							console.log(appSettings.getString('glassTypes'))
						},

						clear() {
							appSettings.clear()
							console.log(appSettings.getAllKeys())
						}


        }
    };
</script>

<style scoped>
		/* .themeSwitch {
			margin-top: 24;
		} */

    .home {
        justify-content: center;
        align-items: center;
				/* height: 100%; */
    }

		.greeting {
			margin-bottom: 40;
		}

    .button-container {
        width: 45%;

        flex-direction: column;
        align-items: center;
    }

		.img {
			box-shadow: 10 10 10 black;
		}
</style>