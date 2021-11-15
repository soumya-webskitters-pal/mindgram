//svg anim
function create_canvas(canvas_target) {
  "use strict";
  window.addEventListener('load', function () {
    if (typeof (canvas_target) != 'undefined' && canvas_target != null) {
      //grab html element to attach to.
      var $container = document.getElementById(canvas_target);
      var renderer, scene, camera;
      //Build the scene
      var width = $container.clientWidth,
        height = $container.clientWidth;
      var particle, particle_count = 60;
      var colors = [0x6f80ec, 0x00ffff];
      var speed = 10000;

      function getRandom(min, max) {
        return min + Math.random() * (max - min);
      }

      //Create WebGL renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);

      //Create scene
      scene = new THREE.Scene();

      //append canvas
      $container.append(renderer.domElement);

      //CREATE camera
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
      scene.add(camera);

      // setup camera
      camera.position.y = 160;
      camera.position.z = 350;
      camera.aspect = width / height;
      camera.lookAt(scene.position);

      //CREATE Cube object
      var cubeGeometry = new THREE.IcosahedronGeometry(100, 1);
      var cubeMaterial = new THREE.MeshPhongMaterial({ wireframe: true, color: colors[0], opacity: 0.5, transparent: true, side: THREE.DoubleSide, shading: THREE.FlatShading });
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.rotation.x = Math.PI * 5 / 180;
      cube.rotation.y = Math.PI * 45 / 180;
      cube.rotation.z = Math.PI * 5 / 180;
      scene.add(cube);

      // CREATE particles
      particle = new THREE.Object3D();
      for (var i = 0; i < particle_count; i++) {
        var geometry = new THREE.IcosahedronGeometry(getRandom(0.5, 3), 1);
        var cls = colors[Math.round(getRandom(0, 1))];
        var material = new THREE.MeshBasicMaterial({
          color: cls,
          side: THREE.DoubleSide,
          flatShading: true,
        });
        // geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 100, 0));
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
        mesh.position.multiplyScalar(90 + (Math.random() * 50));
        particle.add(mesh);
      }
      scene.add(particle);

      //START lighting
      var ambientLight = new THREE.AmbientLight(colors[0], 0.2);
      scene.add(ambientLight);

      var pointLight;
      pointLight = new THREE.DirectionalLight(colors[1], 0.8, 50);
      pointLight.position.set(-300, 0, 0);
      scene.add(pointLight);

      var lights = [];
      lights[0] = new THREE.DirectionalLight(colors[1], 2);
      lights[0].position.set(50, -50, -10);
      lights[1] = new THREE.DirectionalLight(colors[1], 0.2);
      lights[1].position.set(0, 1, 0);
      scene.add(lights[0]);
      scene.add(lights[1]);


      //DRAW scene
      function render() {
        renderer.render(scene, camera);
        cube.rotation.y = +performance.now() / speed;
        cube.rotation.z = +performance.now() / speed;
        particle.rotation.y = -performance.now() / speed;
        particle.rotation.z = -performance.now() / speed;
        particle.rotation.x = +performance.now() / speed;
        camera.updateProjectionMatrix();
        requestAnimationFrame(render);
      }
      render();

      function onWindowResize() {
        camera.aspect = $container.clientWidth / $container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize($container.clientWidth, $container.clientHeight);
      }
      window.addEventListener('resize', onWindowResize, false);
    }
  });
}
