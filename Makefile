.PHONY: browserlist build build-debug build-profile check deploy dev install lint start telemetry update upgrade vercel clean bootstrap global prepare

GLOBAL := npm npx pnpm @turbo/codemod typescript vercel

browserlist: 
	@pnpx turbo run browserlist

build: 
	@pnpx turbo run build

build-debug: 
	@pnpx turbo run build --debug

build-profile: 
	@pnpx turbo run build --profile

check: 
	@pnpx ncu 
	@pnpx turbo run check

deploy: 
	@pnpx turbo run build test lint deploy

dev: 
	@pnpx turbo run dev  # starts on development mode (does not depend on build)
	
install: 
	@pnpm install 
	@pnpx turbo run install

lint: 
	@pnpx turbo run lint

start:
	@pnpx turbo run start  # start pn production mode (depends on build)

telemetry: upgrade
	@pnpm telemetry 
	@pnpx turbo run telemetry

update: upgrade
	@pnpm update 
	@pnpx turbo run update

upgrade: 
	@pnpx ncu -u
	@pnpx turbo run upgrade

############################
vercel: 
	@#vercel login --github
	@vercel ls 
	@vercel ls mnopi 
	@vercel inspect mnopi.vercel.app
	@vercel dns
	@vercel secrets ls
	@vercel logs mnopi.vercel.app
	@vercel certs ls

############################
clean: 
	@find . -type f -name .pnpm-debug.log -exec rm -f "{}" \; 
	@find . -type f -name "*-profile.json" -exec rm "{}" \; 
	@find . -type f -name "graph-*.jpg" -exec rm "{}" \; 
	@find . -type f -name "report.-*.json" -exec rm "{}" \;
	@find . -type f -name "_lighthouse.html" -exec rm "{}" \;

############################
bootstrap:
	@curl -sfLS https://install-node.vercel.app | sudo bash -s -- --prefix /usr
	@sudo npm install -g corepack
	@corepack prepare pnpm@6.22.2  --activate
	@sudo apt install graphviz

global: 
	@for i in $(PREPARE); do type $$i >/dev/null || sudo pnpm install --global $$i; done 
	@sudo pnpm add --global $(GLOBAL)
	@sudo pnpm upgrade --global $(GLOBAL)

prepare: 
	@pnpm add turbo -DW
	@pnpx @turbo/codemod add-package-manager
