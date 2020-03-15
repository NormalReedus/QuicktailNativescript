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

        </FlexboxLayout>
		<!-- </StackLayout> -->

    </Page>
</template>

<script>
    import Create from "./Create";
    import Cocktails from "./Cocktails";

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