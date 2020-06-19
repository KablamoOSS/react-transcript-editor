// based on https://itnext.io/how-to-package-your-react-component-for-distribution-via-npm-d32d4bf71b4f
// and http://jasonwatmore.com/post/2018/04/14/react-npm-how-to-publish-a-react-component-to-npm
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackNodeExternals = require('webpack-node-externals');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    index: './packages/index.js',
    TranscriptEditor: './packages/components/transcript-editor/index.js',
    TimedTextEditor: './packages/components/timed-text-editor/index.js',
    MediaPlayer: './packages/components/media-player/index.js',
    ProgressBar: './packages/components/media-player/src/ProgressBar.js',
    PlaybackRate: './packages/components/media-player/src/PlaybackRate.js',
    PlayerControls: './packages/components/media-player/src/PlayerControls/index.js',
    Select: './packages/components/media-player/src/Select.js',
    VideoPlayer: './packages/components/video-player/index.js',
    Settings: './packages/components/settings/index.js',
    KeyboardShortcuts: './packages/components/keyboard-shortcuts/index.js',
    timecodeConverter: './packages/util/timecode-converter/index.js',
    exportAdapter: './packages/export-adapters/index.js',
    sttJsonAdapter: './packages/stt-adapters/index.js',
    groupWordsInParagraphsBySpeakersDPE: './packages/stt-adapters/digital-paper-edit/group-words-by-speakers.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.module.(sa|sc|c)ss$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { modules: true, sourceMap: isDevelopment }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: isDevelopment }
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: isDevelopment }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: isDevelopment }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'packages'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env', '@babel/preset-react' ]
          }
        }
      }
    ]
  },
  resolve: {},
  externals: [
    webpackNodeExternals(),
  ],
};
