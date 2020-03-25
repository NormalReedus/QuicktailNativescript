<template>
  <ScrollView>
    <GridLayout rows="auto auto auto" columns="*">
      <Button @tap="takePhoto" row="0">PHOTO</Button>
      <Image v-if="imgSrc" :src="imgSrc" row="1" loadMode="async" stretch="aspectFit" />
      <TextView editable="true" v-model="description" row="2" />
      <!-- <Button @tap="test" row="1">TEST</Button> -->
    </GridLayout>
  </ScrollView>
</template>

<script>
import * as camera from 'nativescript-camera'
import { Image } from 'tns-core-modules/ui/image'

const ism = require('tns-core-modules/image-source')
const fsm = require('tns-core-modules/file-system')
const { ImageCropper } = require('nativescript-imagecropper')
const imageSize = 512

export default {
	name: 'FormMisc',

	computed: {
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
		async takePhoto() {
			try {
				// Gets permission to camera and photos:
				await camera.requestPermissions()
			} catch (err) {
				throw new Error('Error requesting camera permission')
			}

			let imageAsset
			try {
				// Sets the actual image asset to a pic taken from camera (android saves to gallery here too):
				imageAsset = await camera.takePicture({
					saveToGallery: false,
					allowsEditing: true,
				})
			} catch (err) {
				throw err
			}

			// A new source object is created...
			const source = new ism.ImageSource()
			// And is set to reference the image:
			let imageSource = await source.fromAsset(imageAsset)

			// The cropper is called:
			const imageCropper = new ImageCropper()
			// For some reason the return val is 'args' - the cropper reads the image from the beforementioned source and asks user to crop to imageSize:
			const args = await imageCropper.show(imageSource, {
				width: imageSize,
				height: imageSize,
			})
			if (args.image === null) {
				throw new Error('Error during cropping')
			}
			// The source is updated to point to the new cropped image:
			imageSource = args.image

			// The app's read + write folder, filename, and the full path is defined:
			const folder = fsm.knownFolders.documents().path
			const filename = 'test.png'
			const path = fsm.path.join(folder, filename)
			// We save the img to the specified path:
			const saved = imageSource.saveToFile(path, 'png')
			if (saved) {
				console.log('Image saved')
				// We load the file from the saved path into Vuex, so it can be shown in the misc-tab:
				this.imgSrc = ism.fromFile(path)
			}
		},

		test() {
			console.log(fsm.knownFolders.documents().getFile('test.png'))
		},
	},
}
</script>

<style lang="scss" scoped>
</style>