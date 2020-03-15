<template>
    <Page>
        <ActionBar title="Cocktails">
            <StackLayout orientation="horizontal"
                ios:horizontalAlignment="center"
                android:horizontalAlignment="center">
                <Label text="Cocktails" class="h2" />
            </StackLayout>
        </ActionBar>

        <Label text="Cocktails" />
    </Page>
</template>

<script>
    export default {
        name: "Cocktails",
        data() {
            return {};
        }
    };
</script>

<style>
</style>