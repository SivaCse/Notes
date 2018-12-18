# module types

* Core

* Shared

* feature  - Eager/ Lazy 

* App Module

--------------------------

Core

  create app level components and singleton services. import common module and RouterModule.


Shared

    * shared pipes , components, directives.
    * exports these three in this modules exports array and use it in other modules by just import this module in to app module's imports section.
    * once exports components in shared module , declaring in in the declarations array is no need.
    * once you used common module in shared module, you dont need to import it into other feature module.


feature

      that module's own components , services, pipes, services
