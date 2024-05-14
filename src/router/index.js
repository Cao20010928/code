
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: ()=> import('../views/logInSignUp'),

    },
    {
        path: '/mainMenu',
        component: ()=> import('../views/mainMenu'),

    },
    {
        path: '/expertsList',
        component: ()=> import('../views/expertsList'),
        meta: {
            showNav: false
        }
    },
    {
        name: 'expertsPortal',
        path: '/expertsPortal',
        component: ()=> import('../views/expertsPortal'),
        meta: {
            showNav: false
        }
    },
    {
        path: '/dataImport',
        component: ()=> import('../views/dataImport'),
        meta: {
            showNav: false
        }
    },
    {
        path: '/farmCatalog',
        component: ()=> import('../views/farmCatalog'),
        meta: {
            showNav: false
        }
    },
    {
        path: '/tasksForManagers',
        component: ()=> import('../views/tasksForManagers'),
        meta: {
            showNav: false
        }
    },
    {
        path: '/firstSolution',
        component: ()=> import('../views/firstSolution'),
        meta: {
            showNav: false
        }
    },
    {
        path: '/tasksForUsers',
        component: ()=> import('../views/tasksForUsers'),
        meta: {
            showNav: false
        }
    },
    {
        path: '/messagePush',
        component: ()=> import('../components/messagePush'),
        meta: {
            showNav: false
        }
    },
    {
        path: '/popUp',
        component: ()=> import('../components/popUp'),
        meta: {
            showNav: false
        }
    },
    {
        path: '/farmDetails',
        name: 'farmDetails',
        component: ()=> import('../views/farmDetails'),
        meta: {
            showNav: false
        }
    },
    {
        path: '/diseaseDetails',
        component: ()=> import('../views/diseaseDetails'),

    },
    {
        path: '/tasksForUsers/taskDetails',
        component: ()=> import('../views/taskDetails')
    },
    {
        path: '/managersList',
        component: ()=> import('../views/managersList')
    },
    {
        path: '/managersPortal',
        component: ()=> import('../views/managersPortal')
    },
    {
        path: '/historyOfManagers',
        component: ()=> import('../views/historyOfManagers')
    },
    {
        path: '/tasksForManagers/applyDetails',
        component: ()=> import('../views/applyDetails')
    },
    {
        path: '/tasksForExperts',
        component: ()=> import('../views/tasksForExperts')
    },
    {
        path: '/expertSelect',
        component: ()=> import('../views/expertSelect')
    },
    {
        path: '/historyOfExperts',
        component: ()=> import('../views/historyOfExperts')
    },
    {
        path: '/historyOfExperts/expertsDetail',
        component: ()=> import('../views/expertsDetail')
    },
    {
        path: '/informationCenter',
        component: ()=> import('../views/informationCenter')
    },
    {
        path: '/checkBox',
        component: () => import('../views/testBug')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
// router.beforeEach()
export default router