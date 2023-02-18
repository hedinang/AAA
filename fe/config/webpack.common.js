module.exports = {
   resolve: {
      extensions: [".jsx", ".js", ".ts", ".tsx", ".json", ".css", ".scss", ".jpg", ".jpeg", ".png", ".svg"],
      fallback: {
         "fs": false
      },
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
         },
         {
            test: /\.(png|jpe?g)$/i,
            use: [
               {
                  loader: "file-loader",
               },
            ],
         },
         {
            test: /\.m?js/,
            type: "javascript/auto",
            resolve: {
               fullySpecified: false,
            },
         },
         {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader",
               options: {
                  presets: ["@babel/preset-react", "@babel/preset-env"],
                  plugins: ["@babel/plugin-transform-runtime"],
               },
            },
         },

         // {
         //    test: /\.(css|s[ac]ss)$/i,
         //    use: ["style-loader", "css-loader", "postcss-loader"],
         // },
         {
            test: /\.svg$/,
            use: [
               {
                  loader: 'svg-url-loader',
                  options: {
                     limit: 10000,
                  },
               },
            ],
         },
         {
            test: /\.s?css$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
         },
      ],
   },
};
