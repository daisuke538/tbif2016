###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

# build後の.html内で読み込まれる各ファイルパス
set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'
set :fonts_dir, 'fonts'

###
# Helpers
###

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

configure :development do
  activate :livereload
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # ignoreで指定したディレクトリ/ファイルを middleman build の対象外にする
  ignore 'stylesheets/'
  ignore 'javascripts/*'
  ignore 'images/*'
  ignore 'fonts/*'

  # slimファイルをhtmlに変換する
  set :slim, { :pretty => true, :sort_attrs => false, :format => :html }
  #activate :asset_host, :host => '/cocono_fest_2016'

  # middleman build 実行後に gulp build を実行する
  after_build do
    system( 'gulp build' )
  end
end

# デプロイ設定
activate :deploy do |deploy|
  deploy.build_before = true
  deploy.deploy_method = :git
#  deploy.method = :git
  deploy.branch = 'gh-pages'
end
