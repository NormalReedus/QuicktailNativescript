<template>
    <Page actionBarHidden="true" >

		<!-- <StackLayout> -->
				<!-- <StackLayout class="themeSwitch">
				<Label :text="theme"/>
					<Switch :checked="darkTheme" @checkedChange="test($event)/*$emit('themeChange', $event)*/" horizontalAlignment="center"/>
				</StackLayout> -->

        <FlexboxLayout flexDirection="column" class="home">

            <Label text="What would you like to do?" class="h1 greeting" textWrap="true"/>

            <FlexboxLayout>

                <FlexboxLayout class="button-container">
                    <Image src="~/create_btn.png" @tap="navToCreate" class="m-x-25 img"></Image>
                    <Label text="Create" class="h2" />
                </FlexboxLayout>

                <FlexboxLayout class="button-container">
                    <Image src="~/cocktails_btn.png" @tap="navToCocktails" class="m-x-25 img"></Image>
                    <Label text="Cocktails" class="h2" />
                </FlexboxLayout>

            </FlexboxLayout>

						<!-- TEST -->
						<Button text="Keys" @tap="keys" class="-primary"></Button>
						<Button text="Value" @tap="val" class="-outline"></Button>
						<Button text="Clear" @tap="clear" class="-danger"></Button>

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