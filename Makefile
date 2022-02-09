.PHONY: bootstrap global prepare vercel

GLOBAL := npm npx pnpm @turbo/codemod typescript vercel


bootstrap:
	@curl -sfLS https://install-node.vercel.app | sudo bash -s -- --prefix /usr
	@sudo npm install -g corepack
	@corepack prepare pnpm@6.22.2  --activate

build: 
	@pnpm turbo run build

global: 
	@for i in $(PREPARE); do type $$i >/dev/null || sudo pnpm install --global $$i; done 
	@sudo pnpm add --global $(GLOBAL)
	@sudo pnpm upgrade --global $(GLOBAL)

prepare: 
	@pnpm add turbo -DW
	@pnpx @turbo/codemod add-package-manager
	
vercel: 
	@#vercel login email
	@vercel ls 
	@vercel ls mnopi 
	@vercel inspect mnopi.vercel.app
	@vercel dns
	@vercel secrets ls
	@vercel logs mnopi.vercel.app
	@vercel certs ls
