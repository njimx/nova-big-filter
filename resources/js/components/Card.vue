<template>
    <div v-if="filters.length > 0" class="bg-30 border-b border-60">
        <scroll-wrap :height="card.filterMaxHeight ? card.filterMaxHeight : 350">
            <div v-if="! card.filterHideTitle" class="py-2 w-full block text-xs uppercase tracking-wide text-center text-80 dim font-bold focus:outline-none">
                {{this.card.filterMenuTitle ? this.card.filterMenuTitle : 'Filter Menu'}}
            </div>

            <!-- Custom Filters -->
            <div v-for="(filters, index) in this.filterRows" :key="index" class="flex">
                <div class="nova-big-filter-col">
                    <component
                            v-if="filters[0]"
                            :resource-name="resourceName"
                            :key="filters[0].name"
                            :filter-key="filters[0].class"
                            :is="filters[0].component"
                            @input="filterChanged"
                            @change="filterChanged"
                    />
                </div>
                <div class="nova-big-filter-col">
                    <component
                            v-if="filters[1]"
                            :resource-name="resourceName"
                            :key="filters[1].name"
                            :filter-key="filters[1].class"
                            :is="filters[1].component"
                            @input="filterChanged"
                            @change="filterChanged"
                    />
                </div>
                <div class="nova-big-filter-col">
                    <component
                            v-if="filters[2]"
                            :resource-name="resourceName"
                            :key="filters[2].name"
                            :filter-key="filters[2].class"
                            :is="filters[2].component"
                            @input="filterChanged"
                            @change="filterChanged"
                    />
                </div>
            </div>

            <!-- Soft Deletes -->
            <div v-if="softDeletes && showTrashedOption">
                <h3 slot="default" class="text-sm uppercase tracking-wide text-80 bg-30 p-3">
                    {{ __('Trashed') }}
                </h3>

                <div class="p-2">
                    <select
                            slot="select"
                            class="block w-full form-control-sm form-select"
                            dusk="trashed-select"
                            :value="trashed"
                            @change="trashedChanged"
                    >
                        <option value="" selected>&mdash;</option>
                        <option value="with">{{ __('With Trashed') }}</option>
                        <option value="only">{{ __('Only Trashed') }}</option>
                    </select>
                </div>
            </div>

            <div v-if="filtersAreApplied" class="bg-30 border-b border-60">
                <button
                        @click="clearSelectedFilters"
                        class="py-2 w-full block text-xs uppercase tracking-wide text-center text-80 dim font-bold focus:outline-none"
                >
                    {{ __('Reset Filters') }}
                </button>
            </div>

        </scroll-wrap>
    </div>
</template>

<script>
    import {default as InteractsWithQueryString} from 'InteractsWithQueryString';
    import {default as Filterable} from 'Filterable';
    export default {
        mixins: [ InteractsWithQueryString, Filterable ],
        props: {
            card: {
                filterMenuTitle: String,
                filterMaxHeight: Number,
                filterHideTitle: {
                    type: Boolean,
                    default: false
                }
            },
            resourceName: String,
            softDeletes: Boolean,
            viaResource: String,
            viaHasOne: Boolean,
            trashed: {
                type: String,
                validator: value => ['', 'with', 'only'].indexOf(value) != -1,
            },
            perPage: [String, Number],
            showTrashedOption: {
                type: Boolean,
                default: true,
            },
        },
        methods: {
            trashedChanged(event) {
                this.$emit('trashed-changed', event.target.value)
            },

            perPageChanged(event) {
                this.$emit('per-page-changed', event.target.value)
            },
        },

        computed: {
            /**
             * Get the name of the page query string variable.
             */
            pageParameter() {
                return this.viaRelationship
                    ? this.viaRelationship + '_page'
                    : this.resourceName + '_page'
            },
            /**
             * Return the filters from state
             */
            filters() {
                return this.$store.getters[`${this.resourceName}/filters`]
            },

            /**
             * Determine via state whether filters are applied
             */
            filtersAreApplied() {
                return this.$store.getters[`${this.resourceName}/filtersAreApplied`]
            },

            /**
             * Return the number of active filters
             */
            activeFilterCount() {
                return this.$store.getters[`${this.resourceName}/activeFilterCount`]
            },

            filterRows(){
                if( this.filters.length > 3)
                {
                    return _.chunk(this.filters, 3)
                }
                else
                {
                    return [ this.filters ]
                }
            }
        }
    }
</script>
