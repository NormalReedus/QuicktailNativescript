<template>
  <ScrollView>
    <GridLayout rows="auto * auto auto" columns="*">
      <TextField hint="Name" v-model="name" class="-border -rounded" row="0" />

      <TextView
        hint="Description"
        editable="true"
        v-model="description"
        row="1"
        class="-border -rounded"
      />

      <FlexboxLayout row="2" justifyContent="center">
        <Button @tap="takePhoto">Take Photo</Button>
        <Button @tap="pickPhoto">Gallery</Button>
      </FlexboxLayout>

			<AbsoluteLayout v-if="imgSrc" row="3">
				<Image
				width="100%"
				top="0"
				left="0"
        :src="imgSrc"
        loadMode="async"
        stretch="aspectFit"
        class="img-circle"
      	/>
			
				<Label color="white" fontSize="30" text="" class="far" @tap="imgSrc = ''" margin="20"/>
			</AbsoluteLayout>

      
    </GridLayout>
  </ScrollView>
</template>

<script>
import * as camera from 'nativescript-camera'
import * as imagepicker from 'nativescript-imagepicker'
import { Image } from 'tns-core-modules/ui/image'

const is = require('tns-core-modules/image-source')

const { ImageCropper } = require('nativescript-imagecropper')
const imageSize = 1024

export default {
	name: 'FormMisc',

	data() {
		return {
			images: [],
		}
	},

	computed: {
		name: {
			get() {
				return this.$store.state.name
			},

			set(data) {
				this.$store.commit('update', {
					prop: 'name',
					data,
				})
			},
		},

		description: {
			get() {
				return this.$store.state.description
			},

			set(data) {
				this.$store.commit('update', {
					prop: 'description',
					data,
				})
			},
		},

		imgSrc: {
			get() {
				return this.$store.state.imgSrc
			},

			set(data) {
				this.$store.commit('update', { 
					prop: 'imgSrc',
					data 
				})
			},
		},
	},

	methods: {
		async pickPhoto() {
			try {
				const context = imagepicker.create({
					mode: 'single',
				})

				await context.authorize()

				const [imageAsset] = await context.present() // Returns array even though we only get 1 asset, so we use destructuring to just get [0]

				this.handleImage(imageAsset)
			} catch (err) {
				console.log('Error picking a photo', err)
			}
		},

		async takePhoto() {
			try {
				// Gets permission to camera and photos:
				await camera.requestPermissions()
			} catch (err) {
				console.log('Error requesting camera permission', err)
			}

			let imageAsset
			try {
				// Sets the actual image asset to a pic taken from camera (android saves to gallery here too):
				imageAsset = await camera.takePicture({
					saveToGallery: false,
					allowsEditing: true,
				})
			} catch (err) {
				console.log('Error taking picture', err)
			}

			this.handleImage(imageAsset)
		},

		async handleImage(imageAsset) {
			const source = new is.ImageSource()
			// Source object is set to reference the image:
			let imageSource = await source.fromAsset(imageAsset)
			imageSource = await this.cropImage(imageSource)

			// Important that we only use the imageSource here, because it does not save well in JSON
			// The source is thus only for temporary use (after selection, before saving)
			// After save, we load from the path when displaying image
			this.imgSrc = imageSource
		},

		async cropImage(imageSource) {
			// The cropper is called:
			const imageCropper = new ImageCropper()
			// For some reason the return val is 'args' - the cropper reads the image from the beforementioned source and asks user to crop to imageSize:
			const args = await imageCropper.show(imageSource, {
				width: imageSize,
				height: imageSize,
			})
			if (args.image === null) {
				console.log('Error during cropping')
			}
			// The source is updated to point to the new cropped image:
			imageSource = args.image
			return imageSource
		},
	},
}
</script>

<style lang="scss" scoped>
</style>