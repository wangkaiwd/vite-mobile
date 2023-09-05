export default () => {
  return {
    plugins: {
      'postcss-px-to-viewport': {
        viewportUnit: "vw",
        fontViewportUnit: "vw",
        viewportWidth: 375,
        exclude: [/^(?!.*node_modules\/react-vant)/]
      }
    }
  }
}
