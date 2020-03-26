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

      <Image
        v-if="imgSrc"
        :src="imgSrc"
        row="3"
        loadMode="async"
        stretch="aspectFit"
        class="img-circle p-20"
      />
    </GridLayout>
  </ScrollView>
</template>

<script>
import * as camera from 'nativescript-camera'
import * as imagepicker from 'nativescript-imagepicker'
import { Image } from 'tns-core-modules/ui/image'

const ism = require('tns-core-modules/image-source')
const source = new ism.ImageSource()

const fsm = require('tns-core-modules/file-system')
const { ImageCropper } = require('nativescript-imagecropper')
const imageSize = 512

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
				return this.$store.state.miscData.name
			},

			set(val) {
				this.$store.commit('setNested', {
					path: ['miscData', 'name'],
					val,
				})
			},
		},

		description: {
			get() {
				return this.$store.state.miscData.description
			},

			set(val) {
				this.$store.commit('setNested', {
					path: ['miscData', 'description'],
					val,
				})
			},
		},

		imgSrc: {
			get() {
				return this.$store.state.miscData.imgSrc
			},

			set(val) {
				this.$store.commit('setNested', { path: ['miscData', 'imgSrc'], val })
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
			// Source object is set to reference the image:
			let imageSource = await source.fromAsset(imageAsset)
			imageSource = await this.cropImage(imageSource)

			this.imgSrc = imageSource

			//TODO: Flyt save til create-vue - saveCocktail, og sørg for at den nuværende imgSrc (som har en imageSource som val) bliver ændret til at have en val svarende til den path, vi får når billedet er gemt

			// const save = this.saveImage(imageSource)

			// if (save.saved) {
			// 	// We load the file from the saved path into Vuex, so it can be shown in the misc-tab:
			// 	this.loadImage(save.path)
			// }
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

		saveImage(imageSource) {
			const filename = this.uniqueFilename()
			console.log(filename)
			// The app's read + write folder, filename, and the full path is defined:
			const folder = fsm.knownFolders.documents().path
			const path = fsm.path.join(folder, filename)

			// We save the img to the specified path:
			const saved = imageSource.saveToFile(path, 'png')
			return { saved, path }
		},

		loadImage(path) {
			// this.imgSrc = ism.fromFile(path)
			this.imgSrc = path
		},

		uniqueFilename() {
			// 6 digits should be enough:
			return this.name + Date.now() + '.png'
		},
	},
}
</script>

<style lang="scss" scoped>
</style>