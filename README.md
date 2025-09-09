# ContactShadowsXR for ThreeJS

The regular ContactShadow provided with ThreeJS doesn't work for XR, so this is my implementation.
Nothing fancy, I've just copied the code from the "official" version https://threejs.org/examples/webgl_shadow_contact.html and I've changed it quite a bit to work for XR.
Performances where a issue, but I've implemented some optimizations and actually it work quite smooth on my old Galaxy S10 (with blurred shadow and a lot of geometry too).
Any improvement that you like to share will be much appreciated!

# Note
You will see A LOT of warning for WebGL, but this is actually unavoidable because to render the shadow texture I'm using another WebGL context outside of the XR one!


## Installation

1.  Install dependencies
2.  Host the project on a server with a valid SSL (where the url begins with `https://` and the certificate is not self-signed).
3.  If you want try on the fly you can use "npm run serve-public" to use CloudFlared



